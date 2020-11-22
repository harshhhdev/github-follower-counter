const puppeteer = require('puppeteer')

let username = process.argv[2]

if (username == null) return console.log('Error! Please specify a user!')

async function getFollowers(user=`https://github.com/${username}`) {
   let browser = await puppeteer.launch()
   let page = await browser.newPage()
   await page.goto(user)

   let githubFollowers = await page.evaluate(() => {
      var followerCount = document.querySelector('span.text-bold').innerHTML

      if (followerCount == 'optional') return('Error! Incorrect username, make sure to double check your spelling.')
      else return(`That user has a total of ${followerCount} followers!`)
   })

   console.log(githubFollowers)
   await browser.close()
}
getFollowers()
