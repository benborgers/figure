# Figure

Figure creates an asset pipeline for using your Figma files. 

Deploy your own copy of Figure on [Netlify](https://www.netlify.com), and it will give you always-updated URLs for all the Frames in your Figma file. 

You no longer have to export and re-upload assets every time they change. Just rebuild the Netlify site to pull in new assets and keep using the same URL to the asset. 


# Instructions

You can deploy this project to your own Netlify account using this button: 

[![deploy to Netlify button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/benborgers/figure)

Then, go into the Netlify build settings and define two environment variables: 

* `token`, your Figma [access token](https://www.figma.com/developers/api#access-tokens)
* `file`, the ID to your Figma file (the random string in the URL of your file)

# Usage

Now, every time you rebuild your Netlify site (in the Netlify UI, open your site, then go to Deploys → Trigger deploy → Deploy site, you'll see it downloading all the Frames of your Figma file to their own URLs. The URL is based off of the Frame name, and will be logged to the console in the Netlify deploy logs. 

That's all! You can now use that URL for any project, and if you edit the Frame in Figma, you just have to rebuild the site in Netlify to update the underlying asset. 