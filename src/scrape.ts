import { launch, Puppeteer } from 'puppeteer';

export async function scrapeTrendingNews() {
    const url = "https://x.com/i/trending/1893770187477754240";
    
    // Launch Puppeteer
    const browser = await launch({ headless: true }); 
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract headline
    const headline = await page.evaluate(() => {
        const headlineElement = document.querySelector("span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3");
        return headlineElement ? (headlineElement as HTMLElement).innerText : "No headline found";
    });

    // Extract post content
    const postContent = await page.evaluate(() => {
        const contentElement = document.querySelector("div.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41 span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3");
        return contentElement ? (contentElement as HTMLElement).innerText : "No content found";
    });

    console.log({ headline, postContent });

    await browser.close();

    return { headline, postContent };
}

// Run scraper
scrapeTrendingNews().then(data => console.log("Scraped Data:", data));
