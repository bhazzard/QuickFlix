> [!NOTE]
> This was a "scratch your own itch" project from the days when there was no such thing as a dedicated streaming device, and Netflix ran in your browser.
> It was a mouseless way to navigate Netflix's web app. It was pretty awesome for the time. Of course now it is only presevered for history's sake.

Have you ever used Netflix on your computer in bed, or on your couch? Do you hate constantly reaching for the mouse?

QuickFlix is a simple extension designed to make Netflix better in bed. You can flip through the results on a search page simply using your arrow keys. When you find something you want to watch, you can just press enter for more information, or shift+enter to start watching instantly.

It's also built for simple integration into automation tools like Alfred, Launchy, Promptu, etc.

Instructions:
 * Just install this extension, and go to a Netflix search results page
 * You'll see a green box around the first result
 * Use your arrow-keys to navigate through results.
   * Up & Down for movie selection
   * Left & Right for page selection
 * When you find a movie you're interested in:
   * Press Enter to go to it's details page
   * Press Shift+Enter to begin watching immediately

Automation Tools Integration
 * Make a new new command to launch chrome and go to Netflix, you can find instructions to do this from the automation tool of your choice.
 * Your command should include a hash at the end of the url:
   * ex: #quickflix[method]={methodname}
 * Currently Supported methods:
   * "play_first_movie": will play the very first movie on a results page. This is useful because Netflix defaults to playing the next unwatched episode for any tv series, so if you combine it with search, you can be watching very quickly.
      * ex: http://movies.netflix.com/WiSearch?&v1=Battlestar+Galactica#quickflix[method]=play_first_movie

Enjoy! And please rate high to encourage improvements to this simple tool.

P.S. this is open source: https://github.com/bhazzard/QuickFlix
