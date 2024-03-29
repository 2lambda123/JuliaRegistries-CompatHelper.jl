using CompatHelper
using Documenter

DocMeta.setdocmeta!(CompatHelper, :DocTestSetup, :(using CompatHelper); recursive=true)

makedocs(;
    modules=[CompatHelper],
    authors="Dilum Aluthge, Brown Center for Biomedical Informatics, and contributors",
    repo="https://github.com/JuliaRegistries/CompatHelper.jl/blob/{commit}{path}#{line}",
    sitename="CompatHelper.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://JuliaRegistries.github.io/CompatHelper.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "Configuration Options" => "options.md",
        "Acknowledgements" => "acknowledgements.md",
        "Other Environments" => "other-environments.md",
        "TroubleShooting" => "troubleshooting.md",
    ],
    strict=true,
)

deploydocs(; repo="github.com/JuliaRegistries/CompatHelper.jl")
