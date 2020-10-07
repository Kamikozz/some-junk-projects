/* eslint-disable */
// 1. Go to https://e.lanbook.com/reader/book/118648/?previewAccess=1
// 2. Open DevTools and paste this code
// 2*. Total pages' number can be found there @see https://e.lanbook.com/book/118648 (where numbers - is your book id)
// 3. Accept download request :D
//
// Also you can send a print request by using this API https://fs1.e.lanbook.com/api/book/118648/print/1/10 where 1 - start page, 10 - how many pages (EXPERIMENTAL)
const settings = {
  BOOK_ID: window.location.pathname.split('/').filter((item) => item).slice(-1),
  BASE_URL: 'https://fs1.e.lanbook.com/api',
  DELAY_BETWEEN_REQUESTS: Number(prompt('How much delay between requests do you want?', 200)),
};
let pagesDownloaded = 0;
const totalPagesCount = Number(prompt('Hom many pages in your book? (for example there are 141 pages https://e.lanbook.com/book/118648)', 100));
const getPageBlob = async (pageNum) => {
  const ENDPOINT = `book/${settings.BOOK_ID}/page/${pageNum}/img`;
  let blob;

  try {
    const response = await fetch(`${settings.BASE_URL}/${ENDPOINT}`);
    blob = await response.blob();
  } catch (e) {
    console.error('Error occurred: ', e.message);
  }

  return blob;
};

const downloadFile = async (pageNum) => {
  let isDownloaded = false;
  const blob = await getPageBlob(pageNum);

  if (blob) {
    const link = document.createElement('a');
    link.download = `${pageNum}.svg`;
    link.href = window.URL.createObjectURL(blob);
    link.click();

    window.URL.revokeObjectURL(link.href); // to free browser's memory

    isDownloaded = true;
    pagesDownloaded += 1;
    console.log(`Downloaded: ${pagesDownloaded}/${totalPagesCount}`);
  }

  return isDownloaded;
};

const download = async () => {
  let isSuccess = false;
  const downloads = new Array(totalPagesCount).fill('').map((item, index) => {
    return downloadFile.bind(null, index + 1);
  });

  let buffer = downloads.map((item, index) => {
    return {
      value: item,
      index,
    };
  });

  const downloadCycle = () => {
    const bufferWithOnlyFailedRequests = buffer.filter(({ value }) => value !== true).map(({ index }) => index);
    let i = 0;

    return new Promise((resolve) => {
      setTimeout(function job() {
        const failedItemIndex = bufferWithOnlyFailedRequests[i];
        const item = buffer[failedItemIndex];

        item.value = item.value();

        i += 1;

        const isReachEnd = bufferWithOnlyFailedRequests.length === i;

        if (isReachEnd) {
          resolve();
        } else {
          setTimeout(job, settings.DELAY_BETWEEN_REQUESTS);
        }
      }, settings.DELAY_BETWEEN_REQUESTS);
    });
  };

  const downloadManage = async () => {
    await downloadCycle();

    (await Promise.all(buffer.map(({ value }) => value)))
      .forEach((value, index) => {
        buffer[index].value = value;
      });

    isSuccess = buffer.every(({ value }) => value === true);

    if (!isSuccess) {
      console.error('Some of the pages were not downloaded. Retrying...');
      buffer = buffer.map((item, index) => {
        if (!item.value) {
          item.value = downloads[index];
        }

        return item;
      });

      await downloadManage();
    } else {
      alert('Download complete. Done 100%');
    }
  };

  await downloadManage();
};

download();
