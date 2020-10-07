## Description:
Utility on native `JavaScript` to download book's pages as SVG-files with unlimited access from https://e.lanbook.com.

*Perhaps it is a hacker tool :D*

Originally was written using non-ES5 syntax with XHR.

**Now it's refactored:**
- add better quality UI with prompts *(configurable delay between requests and book's pages count)*
- add async with Promises & Fetch API
- add error handling *(now it's not gonna stop until everything is downloaded even if there are errors - it will retry on the next iteration)*
- interactive download progress in `DevTools`
## How to use:
1. Go to `https://e.lanbook.com/reader/book/`**<book_id>**`/?previewAccess=1`
> (ex. https://e.lanbook.com/reader/book/118648/?previewAccess=1 or https://e.lanbook.com/reader/book/118648/)
2. Open `DevTools` and paste this code
> *Total pages' number can be found there https://e.lanbook.com/book/118648 (where numbers - is your book id)*
3. Accept download requests :D (files are gonna be at your `Downloads` directory named as ex. '1.svg')

> Also you can send a print request by using this API https://fs1.e.lanbook.com/api/book/118648/print/1/10 where 1 - start page, 10 - how many pages (EXPERIMENTAL)
## Overall development time:
`4 September 2019`

Refactored at `08 October 2020`
