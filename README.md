# Canonical's hiring process test

## How to run

In order to simplify as much the whole deliverable, I opted for a plain HTML file served via python's simple HTTP server.

+ If you are running Python 2, you can use `python -m SimpleHTTPServer 3000` and then access the website at `http://localhost:3000`.
+ If you are running Python 3, you can use the equivalent `python -m http.server 3000` and access the same address, `http://localhost:3000`.

## Considerations

I chose to go the leanest possible and just serve a plain HTML/CSS/JS combo from a Python server for several reasons. I wanted to focus on the core of the assignment, using the Vanilla framework and recreating the picture provided as close as I could, and not have to waste time on setups, or require specifics from the reviewer like certain node version, etc.

I also find beauty in choosing the simplest tool for the job rather than using always the whole stack of usual suspects like React, NPM, webpack, etc so in this case I was happy to work with the basics to achieve the goal :)

I have made some assumptions about the JSON and the picture, mainly about the top and bottom content of the card. It seemed to me that the "Article" content was matching the categories found on those JSON entries so I assumed the Footer content would be the category of the post. 

For the top one however, I wasn't really sure so I opted for the Topic since it was either one or none in the JSON provided rather than several items like the tags, and also because the picture provided always had only one item on top too.

I also chose to use higher heading tags since they fit the hierarchy on my HTML, but that came with very large font sizes so I had to override them in CSS in order to be able to keep the semantics of the headers I wanted but also make it look like the image given to me.

I'm also hiding the post thumbnail image for screen readers as I don't think there's a textual description of the image in the WP API to use it as alt.