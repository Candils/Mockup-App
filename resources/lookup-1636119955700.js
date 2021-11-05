(function(window, undefined) {
  var dictionary = {
    "36f00c6d-447c-4382-b453-28b38a233e33": "Profile Screen",
    "587b40f9-f23d-4cfa-b941-04fa7cb9bd56": "Welcome Screen",
    "adbb0dab-7cbe-4ffb-b8f8-1f82836ef4fa": "Resume Screen",
    "860d263f-1fbe-49db-9b0d-d6ac9a0ad5ba": "Documents Screen",
    "01495bc2-5018-416c-abbe-a9324e61388e": "Home Screen",
    "ab8b5a97-3307-4fd9-a1d7-a4e9613dc3ee": "Ficha Final Screen",
    "f892f3ef-1bca-4a69-8ec2-58eb56c5a219": "Login Screen",
    "6a8c7a71-c266-4480-ba0d-ed8a1795daee": "Ficha Screen",
    "6c99670e-6a95-4c3c-a7a4-152fd78dec94": "Novedades Screen",
    "a22476c6-54cb-4afb-a715-525a7e359439": "Detail Screen",
    "582a1c6e-8919-4b0b-a0c6-3ba05b52d638": "Beneficios Screen",
    "da612e0b-2805-4eaa-b1a6-b81b87ae5e3d": "Dashboard 2 Screen",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);