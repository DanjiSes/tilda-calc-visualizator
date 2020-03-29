// 1 клик по селекту марок
// 2 получаю список марок
// 3 клик 
//

var brands      = [];
var models      = [];
var brandIdx    = 0;

async function parse() {
  var $brandInput = $('[data-marker="params[110000]/suggest-input"]');
  var $modelInput = $('[data-marker="params[110001]/suggest-input"]');

  while (true) {
    $brandInput.click();

    await sleep(500);

    let brandItem = $('[data-marker="params[110000]/suggest-dropdown"] li[class^="default-item"]').eq(brandIdx++);

    // Done parse
    if (!brandItem.length) break;

    let brandName = brandItem.children('span').text();

    brands.push(brandName);

    brandItem.click();

    await sleep(500);

    $modelInput.click();

    await sleep(500);

    let modelsList = $('[data-marker="params[110001]/suggest-dropdown"] li[class^="default-item"] span')

    modelsList = modelsList.map(function(index, elem) {
      return brandName + ' ' + elem.innerText;
    });

    models = [...models, ...modelsList];

    $brandInput.next().click();

    await sleep(500);

  }

  console.log('================================')
  console.log('Done!')
  console.log('================================')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

parse();
