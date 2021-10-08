var documenterSearchIndex = {"docs":
[{"location":"acknowledgements/","page":"Acknowledgements","title":"Acknowledgements","text":"CurrentModule = CompatHelper","category":"page"},{"location":"acknowledgements/#Acknowledgements","page":"Acknowledgements","title":"Acknowledgements","text":"","category":"section"},{"location":"acknowledgements/","page":"Acknowledgements","title":"Acknowledgements","text":"CompatHelper was originally created by the Brown Center for Biomedical Informatics at Brown University.","category":"page"},{"location":"acknowledgements/","page":"Acknowledgements","title":"Acknowledgements","text":"This work was supported in part by National Institutes of Health grants U54GM115677, R01LM011963, and R25MH116440. The content is solely the responsibility of the authors and does not necessarily represent the official views of the National Institutes of Health.","category":"page"},{"location":"other-environments/","page":"Other Environments","title":"Other Environments","text":"CurrentModule = CompatHelper","category":"page"},{"location":"other-environments/#Self-Hosting-and-Other-Environments","page":"Other Environments","title":"Self-Hosting and Other Environments","text":"","category":"section"},{"location":"other-environments/","page":"Other Environments","title":"Other Environments","text":"It is possible to run CompatHelper on custom infrastructure. This includes GitHub Enterprise, public GitLab, or even private GitLab. To use any of these you need to just create and pass along the CI Configuration. The example below would be for GitHub Enterprise:","category":"page"},{"location":"other-environments/","page":"Other Environments","title":"Other Environments","text":"using CompatHelper\n\nENV[\"GITHUB_TOKEN\"] = \"GitHub Enterprise Personal Access Token\"\nENV[\"GITHUB_REPOSITORY\"] = \"Organization/Repository\"\n\nconfig = CompatHelper.GitHubActions(;\n    username=\"GitHub Enterprise Username\",\n    email=\"GitHub Enterprise Email\",\n    api_hostname=\"https://github.company.com/api/v3\",\n    clone_hostname=\"github.company.com\"\n)\n\nCompatHelper.main(ENV, config)","category":"page"},{"location":"other-environments/","page":"Other Environments","title":"Other Environments","text":"You can also create your own configurations, for example TeamCity:","category":"page"},{"location":"other-environments/","page":"Other Environments","title":"Other Environments","text":"using CompatHelper\n\nconfig = CompatHelper.GitHubActions(;\n    username=\"TeamCity Username\"\n    email=\"TeamCity Email\",\n    api_hostname=\"http://<TeamCity Server host>:<port>/app/rest/server\"\n    clone_hostname=\"http://<TeamCity Server host>\"\n)\n\nCompatHelper.main(ENV, config)","category":"page"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"CurrentModule = CompatHelper","category":"page"},{"location":"troubleshooting/#Troubleshooting","page":"TroubleShooting","title":"Troubleshooting","text":"","category":"section"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"Here are some tips for troubleshooting CompatHelper.","category":"page"},{"location":"troubleshooting/#CompatHelper-workflow-file","page":"TroubleShooting","title":"CompatHelper workflow file","text":"","category":"section"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"The first step is to update your CompatHelper workflow file, which is usually located  in your repository at .github/workflows/CompatHelper.yml. Make sure that this file exactly matches the contents of the file located at https://github.com/JuliaRegistries/CompatHelper.jl/blob/master/.github/workflows/CompatHelper.yml.","category":"page"},{"location":"troubleshooting/#Manifest-files","page":"TroubleShooting","title":"Manifest files","text":"","category":"section"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"If CompatHelper is still failing, try deleting the following files (if they exist):","category":"page"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"/Manifest.toml\n/test/Manifest.toml\n/JuliaManifest.toml\n/test/JuliaManifest.toml","category":"page"},{"location":"troubleshooting/","page":"TroubleShooting","title":"TroubleShooting","text":"If you continue to experience errors, try deleting all Manifest.toml files and JuliaManifest.toml files from your repository.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CurrentModule = CompatHelper","category":"page"},{"location":"options/#Configuration-Options","page":"Configuration Options","title":"Configuration Options","text":"","category":"section"},{"location":"options/#Packages-in-subdirectories","page":"Configuration Options","title":"Packages in subdirectories","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"By default, CompatHelper expects your git repository to contain a single package, and that the Project.toml for that package exists in the top-level directory. You can indicate that you want CompatHelper to process one or many packages that exist in subdirectories of the git repository by passing the subdirs keyword to the main function. For example:","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; subdirs=[\"\", \"Subdir1\", \"very/deeply/nested/Subdir2\"])","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"Note that the convention for specifying a top-level directory in the subdirs keyword is [\"\"]","category":"page"},{"location":"options/#Custom-registries","page":"Configuration Options","title":"Custom registries","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"To use a list of custom registries instead of the General registry, use the registries keyword argument. For example:","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"my_registries = [Pkg.RegistrySpec(name = \"General\",\n                                  uuid = \"23338594-aafe-5451-b93e-139f81909106\",\n                                  url = \"https://github.com/JuliaRegistries/General.git\"),\n                 Pkg.RegistrySpec(name = \"BioJuliaRegistry\",\n                                  uuid = \"ccbd2cc2-2954-11e9-1ccf-f3e7900901ca\",\n                                  url = \"https://github.com/BioJulia/BioJuliaRegistry.git\")]\n\nCompatHelper.main(; registries=my_registries)","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"Using the above option will clone the registries, but if you want to use already existing registries, you can use the use_existing_registries option. This will use all the registries present in the user depot, defined as the first entry of the DEPOT_PATH by the Pkg manual.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; use_existing_registries=true)","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"If you want to use a different location, you can specify that using the depot keyword. Note that the directroy indicated by depot should contain a subdirectory named registries where the registries are stored in order to reproduce the structure of the Julia depot.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"info: Info\nUsing the above mentioned use_existing_registries can be used in conjunction with the add-julia-registry GitHub action to easily add custom private registries in GitHub Actions CI.","category":"page"},{"location":"options/#Overriding-the-default-branch","page":"Configuration Options","title":"Overriding the default branch","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"By default, CompatHelper will open pull requests against your repository's default branch. If you would like to override this behavior, set the master_branch keyword argument. For example:","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; master_branch=\"my-custom-branch\")","category":"page"},{"location":"options/#EntryType","page":"Configuration Options","title":"EntryType","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"Define how you want to handle compat entries.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"KeepEntry: Default value, this will keep the existing compat entry for a project and add the new one in addition.\nDropEntry: Choose this to drop the existing compat entry and replace it with the new one.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"KeepEntry is the default, but if you like to use DropEntry, you can do the following:","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; entry_type=DropEntry())","category":"page"},{"location":"options/#Unsubscribe-from-Pull-Requests","page":"Configuration Options","title":"Unsubscribe from Pull Requests","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"When a compat Pull Request is created, the user/bot that created the PR will be unsubscribed from the PR that it just created. This is needed in some situations to lower the amount of noise a bot may generate by being subscribed to a PR as any comments/activity will trigger an email/notification for that bot.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"Currently this only works for GitLab as it doesn't seem like the GitHub API has an endpoint for this.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; ubsub_from_prs=true)","category":"page"},{"location":"options/#CC-User","page":"Configuration Options","title":"CC User","text":"","category":"section"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"When a compat Pull Request is created, you might want the user that generated the PR to be notified which should subscribe them to the PR. This can be used in situations where a user manually triggers a CompatHelper run on GitLab, but has it set up so that the PR is created by a bot. In this case, the user would like to be subscribed to the new PRs.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"This will use the GITHUB_ACTOR or GITLAB_USER_LOGIN environment variables to determine which user to mention.","category":"page"},{"location":"options/","page":"Configuration Options","title":"Configuration Options","text":"CompatHelper.main(; cc_user=true)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = CompatHelper","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [CompatHelper]","category":"page"},{"location":"#CompatHelper.main","page":"Home","title":"CompatHelper.main","text":"main(\n    env::AbstractDict=ENV,\n    ci_cfg::CIService=auto_detect_ci_service(; env=env);\n    entry_type::EntryType=KeepEntry(),\n    registries::Vector{Pkg.RegistrySpec}=DEFAULT_REGISTRIES,\n    use_existing_registries::Bool=false,\n    depot::String=DEPOT_PATH[1],\n    subdirs::AbstractVector{<:AbstractString}=[\"\"],\n    master_branch::Union{DefaultBranch,AbstractString}=DefaultBranch(),\n    bump_compat_containing_equality_specifier=true,\n    pr_title_prefix::String=\"\",\n    include_jll::Bool=false,\n    unsub_from_prs=false,\n    cc_user=false,\n    bump_version=false,\n)\n\nMain entry point for the package.\n\nArguments\n\nenv::AbstractDict=ENV: Optional dictionary of environment variables, see README for overview\nci_cfg::CIService=auto_detect_ci_service(; env=env): CI Configuration, default to what is auto-detected\n\nKeywords\n\nentry_type::EntryType=KeepEntry(): How to handle bumps for entry types\nregistries::Vector{Pkg.RegistrySpec}=DEFAULT_REGISTRIES: RegistrySpec of all registries to use\nuse_existing_registries::Bool=false: Specify whether to use the registries available at the depot location\ndepot::String=DEPOT_PATH[1]: The user depot path to use\nsubdirs::AbstractVector{<:AbstractString}=[\"\"]: Subdirectories for nested packages\nmaster_branch::Union{DefaultBranch,AbstractString}=DefaultBranch(): Name of the master branch\nbump_compat_containing_equality_specifier=true: Bump compat entries with equality specifiers\npr_title_prefix::String=\"\": Prefix for pull request titles\ninclude_jll::Bool=false: Include JLL packages to bump\nunsub_from_prs=false: Unsubscribe the user from the pull requests\ncc_user=false: CC the user on the pull requests\nbump_version=false: When set to true, the version in Project.toml will be bumped if a pull request is made. Minor bump if >= 1.0, or patch bump if < 1.0\n\n\n\n\n\n","category":"function"},{"location":"#[CompatHelper.jl](https://github.com/JuliaRegistries/CompatHelper.jl)","page":"Home","title":"CompatHelper.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CompatHelper is a Julia package that helps you keep your [compat] entries up-to-date. Whenever one of your package's dependencies releases a new breaking version, CompatHelper opens a pull request on your repository that modifies your [compat] entry to reflect the newly released version. We would like to eventually add Julia support to Dependabot. If you would like to help with adding Julia support to Dependabot, join us in the #dependabot channel on the Julia Language Slack.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#GitHub","page":"Home","title":"GitHub","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Create a file at .github/workflows/CompatHelper.yml with the contents of the CompatHelper.yml that is included in this repository.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you need to use any special arguments for the main function, you can modify this file to add them.","category":"page"},{"location":"#GitLab","page":"Home","title":"GitLab","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For GitLab you will want to add CompatHelper as a job in your .gitlab-ci.yml file such as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"CompatHelper:\n  image: julia:1.6 # Set to the Julia version you want to use\n  stage: compat # You can place this in any stage that makes sense for your setup\n  before_script:\n    - apt-get update -qq && apt-get install -y git\n    - |\n      julia --color=yes -e \"\n        import Pkg;\n        name = \\\"CompatHelper\\\";\n        uuid = \\\"aa819f21-2bde-4658-8897-bab36330d9b7\\\";\n        version = \\\"3\\\";\n        Pkg.add(; name, uuid, version)\"\n  script:\n    - |\n      julia --color=yes -e \"\n        import CompatHelper;\n        CompatHelper.main()\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Similarly to the GitHub setup, you can modify the main call here if you need to change any of the default arguments. You must also remember to add the GITLAB_TOKEN and COMPATHELPER_PRIV CI secrets to the project so that CompatHelper can find them.","category":"page"},{"location":"#Creating-SSH-Key","page":"Home","title":"Creating SSH Key","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you use GitHub Actions to either test your packge using continuous integration, or build and deploy documentation you will need to create an SSH deploy key. If you wish to reuse an existing SSH key simplify modify the workflow above environment variable to use COMPATHELPER_PRIV: ${{ secrets.DOCUMENTER_KEY }}. Otherwise follow the below instructions to generate a new key,","category":"page"},{"location":"","page":"Home","title":"Home","text":"Generate a new SSH key\nssh-keygen -m PEM -N \"\" -f compathelper_key\nCreate a new GitHub secret\nCopy the private key, cat compathelper_key\nGo to your repositories settings page\nSelect Secrets, and New Repository Secret\nName the secret COMPATHELPER_PRIV, paste the copied private key\nCreate a new deploy key\nCopy the public key, cat compathelper_key.pub\nGo to your repositories settings page\nSelect Deploy Keys, and Add Deploy Key\nName the deploy key COMPATHELPER_PUB, paste in the copied public key\nEnsure that the key has Write Access\nCleanup the SSH key from your computer, rm -f compathelper_key compathelper_key.pub","category":"page"},{"location":"#Base64-SSH-Public-Key","page":"Home","title":"Base64 SSH Public Key","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CompatHelper also supports Base64 encoded SSH Public Keys. One reason for this would be for GitLab usage. On GitLab, if you add an SSH privary key to the CI secrets, if for any reason it prints out, it will show up in the log in plain text. To fix this, you can encode the private key in Base64 which is a format that GitLab can mask in log files.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Once you have created your SSH Public Key as mentioned above, before you delete it, you can convert it to Base64 like so:","category":"page"},{"location":"","page":"Home","title":"Home","text":"openssl enc -base64 -in compathelper_key.pub -out compathelper_key.pub.base64","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can then use the Base64 version in your CI Secret rather than the plain text version. Once that is done, you can delete it from your computer.","category":"page"}]
}
