$(document).ready(function() {
  var options = {
    max_value: 5,
    selected_symbol_type: "fontawesome_star",
    readonly: true
  };
  $(".rating").rate(options);
});

function getCurrentURL() {
  var now_tab = browser.tabs.query({ active: true, lastFocusedWindow: true });
  return now_tab;
}

function get_company_name_from_jobinja_1(path_url, url, tab_id) {
  browser.tabs
    .sendMessage(tab_id, { web_type: "jobinja_1" })
    .then(response => {
      if (response.status == true) {
        var company_name = response.company_name;
        company_name = company_name.replace(/ <span>(.*)/, "");
        jobguy_request(company_name);
      }
    })
    .catch(onError);
}

function get_company_name_from_jobvision_1(path_url, url, tab_id) {
  browser.tabs
    .sendMessage(tab_id, { web_type: "jobvision_1" })
    .then(response => {
      if (response.status == true) {
        var company_name = response.company_name.trim();
        jobguy_request(company_name);
      }
    })
    .catch(onError);
}

function get_company_name_from_quera_1(path_url, url, tab_id) {
  browser.tabs
    .sendMessage(tab_id, { web_type: "quera_1" })
    .then(response => {
      if (response.status == true) {
        var company_name = response.company_name.trim();
        jobguy_request(company_name);
      }
    })
    .catch(onError);
}

function getinfo_quera(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/careers/company")) {
      get_company_name_from_quera_1(path_url, url, tab_id);
    }
  });
}

function getinfo_jobvision(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/jobs/") || path_url.startsWith("/companies/")) {
      get_company_name_from_jobvision_1(path_url, url, tab_id);
    }
  });
}

function getinfo_jobinja(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/companies")) {
      get_company_name_from_jobinja_1(path_url, url, tab_id);
    }
  });
}
function onGot(data) {
  var url = data[0].url;
  var tab_id = data[0].id;
  // console.log(JSON.stringify(data));
  let domain = new URL(url);
  domain.hostname;
  domain = domain.hostname.replace("www.", "");
  if (domain == "jobinja.ir") {
    getinfo_jobinja(url, tab_id);
    return;
  }
  if (domain == "jobvision.ir") {
    getinfo_jobvision(url, tab_id);
    return;
  }
  if (domain == "quera.ir") {
    getinfo_quera(url, tab_id);
    return;
  }
  $(".salary").text(" - ");
  $(".company-rating").text("سایت پشتیبانی نمیشه!");
  $(".link-to-jobguy").prop("disabled", true);
}
function onError(error) {
  // console.log(error);
}
const current_url = getCurrentURL().then(onGot, onError);

$(document).on("click",".show-reviews",function () {
  $(".reviews").show();
  $(".interviews").hide();
  $(".show-reviews").parent().addClass("is-active");
  $(".show-interviews").parent().removeClass("is-active");
});
$(document).on("click",".show-interviews",function () {
  $(".interviews").show();
  $(".reviews").hide();
  $(".show-interviews").parent().addClass("is-active");
  $(".show-reviews").parent().removeClass("is-active");
});