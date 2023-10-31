const COMPATHELPER_GIT_COMMITTER_NAME = "CompatHelper Julia"
const COMPATHELPER_GIT_COMMITTER_EMAIL = "compathelper_noreply@julialang.org"

git_add() = run(`git add -A .`)
git_checkout(branch::AbstractString) = run(`git checkout $branch`)

function get_git_name_and_email(; env=ENV)
    name = if haskey(env, "GIT_COMMITTER_NAME")
        env["GIT_COMMITTER_NAME"]
    else
        COMPATHELPER_GIT_COMMITTER_NAME
    end

    email = if haskey(env, "GIT_COMMITTER_EMAIL")
        env["GIT_COMMITTER_EMAIL"]
    else
        COMPATHELPER_GIT_COMMITTER_EMAIL
    end

    return name, email
end

function git_push(
    remote::AbstractString,
    branch::AbstractString,
    pkey_filename::Union{AbstractString,Nothing}=nothing;
    force=false,
    env=ENV,
    forge::Union{Forge,Nothing}=nothing,
    ci_cfg::Union{CIService,Nothing}=nothing,
    repo::Union{GitHub.Repo,GitLab.Project,Nothing}=nothing,
)
    force_flag = force ? ["-f"] : []
    name, email = get_git_name_and_email(; env=env)
    enable_ssh_verbose_str = get(ENV, "JULIA_COMPATHELPER_ENABLE_SSH_VERBOSE", "false")
    enable_ssh_verbose_b = parse(Bool, enable_ssh_verbose_str)::Bool
    ssh = enable_ssh_verbose_b ? "ssh -vvvv" : "ssh"
    git_ssh_command = isnothing(pkey_filename) ? ssh : "$(ssh) -i $pkey_filename"

    env2 = copy(ENV)
    env2["GIT_SSH_COMMAND"] = git_ssh_command
    if isnothing(pkey_filename)
        true_remote = remote
    else
        # If `pkey_filename` is not `nothing`, then `forge`, `ci_cfg`, and `repo`
        # must all be not `nothing`.
        forge::Forge
        ci_cfg::CIService
        repo::Union{GitHub.Repo,GitLab.Project}

        # We need to convert the remote URL to SSH format.
        # Otherwise, the SSH private key will be ignored.
        true_remote = get_url_for_ssh(forge, ci_cfg, repo)
    end
    cmd = `git -c user.name="$name" -c user.email="$email" -c committer.name="$name" -c committer.email="$email" push $force_flag $true_remote $branch`
    @debug "Attempting to run Git push command" cmd env2["GIT_SSH_COMMAND"]
    run(setenv(cmd, env2))

    return nothing
end

function git_reset(commit::AbstractString; soft=false)
    soft_flag = soft ? ["--soft"] : []
    run(`git reset $soft_flag "$commit"`)

    return nothing
end

function git_commit(message::AbstractString=""; env=ENV)
    name, email = get_git_name_and_email(; env=env)
    cmd = `git -c user.name="$name" -c user.email="$email" commit -m $message`

    result = try
        p = pipeline(cmd; stdout=stdout, stderr=stderr)
        success(p)
    catch
        false
    end

    return result
end

function git_branch(branch::AbstractString; checkout=false)
    run(`git branch $branch`)
    checkout && git_checkout(branch)

    return nothing
end

function git_clone(
    url::AbstractString,
    local_path::AbstractString,
    pkey_filename::Union{AbstractString,Nothing}=nothing,
)
    withenv(
        "GIT_SSH_COMMAND" => isnothing(pkey_filename) ? "ssh" : "ssh -i $pkey_filename"
    ) do
        @mock run(`git clone $url $local_path`)
    end

    return nothing
end

function git_get_master_branch(master_branch::DefaultBranch)
    return string(strip(read(`git rev-parse --abbrev-ref HEAD`, String)))
end
git_get_master_branch(master_branch::AbstractString) = master_branch
