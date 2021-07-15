browser.runtime.onMessage.addListener(request => {
  var response = { status: false };
  if (request.web_type == "jobinja_1") {
    var company_name = document.getElementsByClassName("c-companyHeader__name");
    if (company_name) {
      company_name = company_name[0].innerHTML;
      response = { status: true, company_name: company_name };
    }
  }

  if (request.web_type == "quera_1") {
    var company_name = document.getElementsByClassName("chakra-link")[0];
    if (company_name) {
      company_name = company_name.innerHTML;
      response = { status: true, company_name: company_name };
    }
  }

  if (request == "quera_2") {
    var company_name = document.getElementsByClassName('chakra-heading')[0];
    if (company_name) {
      company_name = company_name.innerHTML;
      response = { status: true, company_name: company_name };
    }
  }

  if (request.web_type == "jobvision_1") {
    var company_name = document.getElementsByClassName(
      "text-black font-size-2 font-weight-bold px-0 py-2"
    )[0];

    if (company_name) {
      company_name = company_name.innerHTML;
      response = { status: true, company_name: company_name };
    } else {
      company_name = document.getElementsByClassName(
        "font-size-1 text-black font-weight-bold"
      )[0];
      if (company_name) {
        company_name = company_name.innerHTML;
        response = { status: true, company_name: company_name };
      }
    }
  }
  return Promise.resolve(response);
});
