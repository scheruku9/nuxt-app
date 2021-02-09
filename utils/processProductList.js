import { find, get, defaultTo } from 'lodash';

export function processProductList(productsList) {
  const processedProductList = productsList.map(product => {
    const attributes = get(product, 'masterData.current.masterVariant.attributes', []);
    const organicAttribute = find(attributes, ['name', 'Organic']) ||  {};
    const isOrganic = organicAttribute.value || false;

    const prices = get(product, 'masterData.current.masterVariant.prices', []);
    const usdPriceData = find(prices, ['value.currencyCode', 'USD']) ||  {};
    const usdPriceValue = usdPriceData.value;
    const usdPrice = usdPriceValue ? usdPriceValue.centAmount / Math.pow(10, usdPriceValue.fractionDigits) : 'N/A';

    const productImages = get(product, 'masterData.current.masterVariant.images', []);
    let thumbnailImageUrl;
    let fullImageUrl;
    if(productImages.length === 1) {
      fullImageUrl = productImages[0].url;
      thumbnailImageUrl= productImages[0].url;
    } else {  
      const thumbnailImageData = find(productImages, ['label', 'in-list, lifestyle']) ||  {};
      thumbnailImageUrl= thumbnailImageData.url;

      const fullImageData = find(productImages, ['label', 'on white']) ||  {};
      fullImageUrl= fullImageData.url;
    }
    fullImageUrl = defaultTo(fullImageUrl, './full.jpg');
    thumbnailImageUrl = defaultTo(thumbnailImageUrl, './thumbnail.jpg');
    
    return {
      name: get(product, 'masterData.current.name.en', 'N/A'),
      description: get(product, 'masterData.current.description.en', 'N/A'),
      thumbnailImageUrl,
      fullImageUrl,
      price: usdPrice,
      isOrganic,
    }
  });

  return processedProductList;
}