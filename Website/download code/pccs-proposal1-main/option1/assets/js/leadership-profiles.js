(function () {
  function groupForLeader(name, role, language, classification) {
    var isManagement = classification === "management" || (!classification && (name === "Tang Lai Huat" || /Corporate Controller|企业财务总监/i.test(role || "")));
    if (language === "zh") return isManagement ? "管理层" : "董事会";
    return isManagement ? "Management" : "Board of Directors";
  }

  window.PCCS_LEADER_GROUP = groupForLeader;

  window.PCCS_LEADERS = {
    "Piong Yew Peng": {
      image: "../images/group/leaders/piong-yew-peng.webp",
      en: "Senior Independent Non-Executive Chairman",
      zh: "高级独立非执行主席"
    },
    "Chan Wee Kiang": {
      image: "../images/group/leaders/chan-wee-kiang.webp",
      en: "Group Managing Director",
      zh: "集团董事总经理"
    },
    "Chan Wee Boon": {
      image: "../images/group/leaders/chan-wee-boon.webp",
      en: "Executive Director",
      zh: "执行董事"
    },
    "Chan Chow Tek": {
      image: "../images/group/leaders/chan-chow-tek.webp",
      en: "Non-Independent Non-Executive Director",
      zh: "非独立非执行董事"
    },
    "Dato’ Chan Chor Ngiak": {
      image: "../images/group/leaders/chan-chor-ngiak.webp",
      en: "Non-Independent Non-Executive Director",
      zh: "非独立非执行董事"
    },
    "Chan Chor Ang": {
      image: "../images/group/leaders/chan-chor-ang.webp",
      en: "Non-Independent Non-Executive Director",
      zh: "非独立非执行董事"
    },
    "Joyce Wong Ai May": {
      image: "../images/group/leaders/joyce-wong-ai-may.webp",
      en: "Independent Non-Executive Director",
      zh: "独立非执行董事"
    },
    "Tang Lai Huat": {
      image: "../images/group/leaders/tang-lai-huat.webp",
      en: "Corporate Controller",
      zh: "企业财务总监"
    }
  };

  var language = document.documentElement.lang === "zh-CN" ? "zh" : "en";

  function labelCard(card) {
    var body = card.querySelector(".leader-card-body");
    if (!body) return;
    var label = body.querySelector(".leader-card-group");
    if (!label) {
      label = document.createElement("span");
      label.className = "leader-card-group";
      body.insertBefore(label, body.firstChild);
    }
    var group = groupForLeader(card.dataset.leaderName, card.dataset.leaderRole, language, card.dataset.leaderClassification);
    card.dataset.leaderGroup = group;
    label.textContent = group;
  }

  document.querySelectorAll(".leader-card").forEach(labelCard);

  document.addEventListener("click", function (event) {
    var card = event.target.closest(".leader-card");
    if (!card) return;
    labelCard(card);
    var modal = document.querySelector("[data-leader-modal]");
    if (!modal) return;
    var group = card.dataset.leaderGroup;
    var topLabel = modal.querySelector(".leader-modal-top > span:first-child");
    var kicker = modal.querySelector(".leader-modal-kicker");
    if (topLabel) topLabel.textContent = group;
    if (kicker) kicker.textContent = group;
  });
}());
