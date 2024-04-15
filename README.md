# sendBeacon tracker collector
This repository is an extension of the code of DuckDuckGo's Tracker Radar Collector, for more details about Tracker Radar Collector visit the [project's homepage](https://github.com/duckduckgo/tracker-radar-collector).
It can be used to track sendBeacon calls even when the page gets closed.

# Analysis
All collected data is processed in Jupyter Notebooks using Python. The results of the analysis can be found in the analysis folder.

## How do I use it?
In order to track sendBeacon calls when pages close first run the reload collector and after that run the API call collector.  
For example:  
`npm run crawl -- -u 'https://example.com/' -o ./data/ -d 'reload,screenshots,requests,cookies,targets,apis'`  
The reload has to be before the other collectors in order for those to track the reload process.
