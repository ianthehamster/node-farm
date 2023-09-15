// in each module, we have access to the module variable where we can set the export property to whatever we want to export

module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic"); //not-organic is the class name in line 262 of template-product.html
  }

  return output;

  // Instead of using '{%PRODUCTNAME}', we can use /{%PRODUCTNAME}/g (regular expression + g) where g stands for global
  // All the {%PRODUCTNAME} placeholders will now get replaced and not just first one that occurs
};
