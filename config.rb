require "susy"

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"
fonts_dir = "fonts"


output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false
#color_output = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
#preferred_syntax = :scss

# This is where the magic happens, nothing too fancy though...
on_stylesheet_saved do
  "compass compile -c config_prod.rb --force"
end

# ref https://coderwall.com/p/gqqfgw
# ref https://coderwall.com/p/jmdgga