// 1 клик по селекту марок
// 2 получаю список марок
// 3 клик 
//

var brands      = {};
var brandIdx    = 0;

var delay = 500;

async function parse() {
  var $brandInput = $('[data-marker="params[110000]/suggest-input"]');
  var $modelInput = $('[data-marker="params[110001]/suggest-input"]');

  while (true) {
    $brandInput.click();

    await sleep(delay);

    let brandItem = $('[data-marker="params[110000]/suggest-dropdown"] li[class^="default-item"]').eq(brandIdx++);

    // Done parse
    if (!brandItem.length) break;

    let brandName = brandItem.children('span').text();

    brandItem.click();

    await sleep(delay);

    $modelInput.click();

    await sleep(delay);

    let modelsList = $('[data-marker="params[110001]/suggest-dropdown"] li[class^="default-item"] span')

    modelsList = modelsList.map(function(index, elem) {
      return elem.innerText;
    });

    brands[brandName] = modelsList;

    $brandInput.next().click();

    console.log('Brands: ' + brandIdx);

    await sleep(delay);

  }

  console.log('================================')
  console.log('Done!')
  console.log('================================')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

parse();
