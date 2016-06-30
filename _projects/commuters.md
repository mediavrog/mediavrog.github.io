---
title: "Commuters"
excerpt: "A heads up on your daily commute."
permalink: /projects/commuters/
timeframe: 2015-08 ~
tags: android crawling parse.com api
header:
 teaser: project-commuters-teaser.png
 overlay_image: project-commuters-cover.png
 cta_url: "https://play.google.com/store/apps/details?id=net.mediavrog.train_status_weather"
gallery:
- url: project-commuters-scribble.png
  image_path: project-commuters-scribble.png
  title: "Layout scribble draft"
---

> A heads up on your daily commute - instant train delays and weather information

## Platforms
Android application

## Development time

- 1 month (15.06.2015 ~ 15.07.2015)
- including idea, concept, design and technical realisation

## Highlights

- parse.com as backend service
- Combining ekidata.jp dataset with custom crawled information
  - from wikipedia for English names and colours
  - from TrainFrontView for train line images
  - scripts written in Ruby using Nokogiri and few other gems
- Weather information from forecast.io api
- crawling official train delay information every 15 minutes using kimonolabs, and pushing the results to a custom parse.com cloud code endpoint
- Twitter integration and crash reporting using fabric.io
- Fonts instead of image assets for weather icons (meteocons) and status icons (generated at fontello)

{% include gallery caption="Scribble" %}