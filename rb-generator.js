var fs = require('fs')

var rb_verison = 1.5
var rb_logo = ' ██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗    ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗\n ██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝    ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗\n ██████╔╝███████║██╔██╗ ██║██║  ███╗█████╗      ██████╔╝██████╔╝███████║██╔██╗ ██║██║  ██║\n ██╔══██╗██╔══██║██║╚██╗██║██║   ██║██╔══╝      ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║  ██║\n ██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗    ██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝\n ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝\n\n'
var rb_description =
' * Range Brand - Official Color Codes for Famous Brands in Iran\n\n' +
' * RangeBrand.less - http://rangebrand.ir\n * Version - ' + rb_verison + '\n' +
' * Licensed under the MIT license - http://opensource.org/licenses/MIT\n\n' +
' * Created by @JavidIzadfar, @setarekarimi1 and @Mehrnooshdsht\n' +
' * Copyright (c) 2016-2017 IKA Computing Club - http://ikacc.ir\n\n'


fs.readFile('./RangeBrand/json/rangebrand.json', 'utf8', function(err, data) {

  if (err) throw err

  var RangeBrand = JSON.parse(data)

  var less = '/*\n\n' + rb_logo + rb_description + '*/\n\n'
  var css = '/*\n\n' + rb_logo + rb_description + '*/\n\n'
  var css_min = '/*\n\n' + rb_description + '*/\n\n'

  for (var brand of Object.keys(RangeBrand)) {

    if ( RangeBrand[brand].colors.length == 1) {
      less += '@rb-' + brand + ': ' + RangeBrand[brand].colors + ';\n'
      css += '.rb-' + brand + '{background-color: ' + RangeBrand[brand].colors + '}\n'
      css += '.rb-' + brand + '-text{color: ' + RangeBrand[brand].colors + '}\n'

    } else {
      for (var i = 0; i < RangeBrand[brand].colors.length; i++) {
        less += '@rb-' + brand + '-' + (i + 1) + ': ' + RangeBrand[brand].colors[i] + ';\n'
        css += '.rb-' + brand + '-' + (i + 1) + '{background-color: ' + RangeBrand[brand].colors[i] + '}\n'
      }
      for (var j = 0; j < RangeBrand[brand].colors.length; j++) {
        css += '.rb-' + brand + '-' + (j + 1) + '-text{color: ' + RangeBrand[brand].colors[j] + '}\n'
      }
    }

    less += '\n'
    css += '\n'

  }

  css_min += css.replace( /\/\*([\s\S]*?)\*\//g , '' ).replace( /\s/g, '')

  console.log('\n');
  console.log(rb_logo);
  console.log(rb_description);

  fs.writeFile('RangeBrand/less/rangebrand.less', less, function(err) {
      if(err) throw err
      console.log("LESS file was saved!");
  });
  fs.writeFile('RangeBrand/css/rangebrand.css', css, function(err) {
      if(err) throw err
      console.log("CSS file was saved!");
  });
  fs.writeFile('RangeBrand/css/rangebrand.min.css', css_min, function(err) {
      if(err) throw err
      console.log("Minified CSS file was saved!");
  });


})
