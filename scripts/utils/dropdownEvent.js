// Cette fonction `openCloseDropdown` permet de gérer l'ouverture et la fermeture des menus déroulants lorsqu'un bouton est cliqué.

// La première étape consiste à sélectionner tous les boutons de menu déroulant dans le document.
const dropdownButtons = document.querySelectorAll('.dropdown_btn');
let chevron; // Variable pour stocker l'élément chevron de chaque bouton de menu déroulant.

// Fonction pour basculer l'état du menu déroulant (ouvert/fermé).
function toggleDropdown(btn) {
    const dropdownContent = btn.nextElementSibling; // Sélectionne le contenu du menu déroulant associé au bouton cliqué.
    chevron = btn.querySelector('.fa-chevron-down'); // Sélectionne l'élément chevron à l'intérieur du bouton.

    // Bascule la classe 'rotate' sur l'élément chevron pour le faire pivoter, et bascule la classe 'active' sur le contenu du menu déroulant pour l'afficher ou le masquer.
    chevron.classList.toggle('rotate');
    dropdownContent.classList.toggle('active');
};

// Fonction pour fermer les autres menus déroulants lorsque l'un d'eux est ouvert.
function closeOtherDropdowns(clickedButton) {
    dropdownButtons.forEach(btn => {
        chevron = btn.querySelector('.fa-chevron-down'); // Sélectionne l'élément chevron de chaque bouton.
        // Si le bouton n'est pas celui qui a été cliqué, il ferme son menu déroulant en retirant les classes 'rotate' et 'active'.
        if (btn !== clickedButton) {
            chevron.classList.remove('rotate');
            btn.nextElementSibling.classList.remove('active');
        }
    });
};

// Fonction pour gérer la mise au point des éléments focusables à l'intérieur du menu déroulant.
function focusableElements(btn) {
    const dropdownContent = btn.nextElementSibling; // Sélectionne le contenu du menu déroulant associé au bouton cliqué.
    const focusableElements = dropdownContent.querySelectorAll('input, button, li'); // Sélectionne les éléments focusables à l'intérieur du menu déroulant.

    // Si le menu déroulant est actif, configure l'attribut 'tabindex' de chaque élément focusable à '0' pour les rendre focusables.
    // Sinon, configure l'attribut 'tabindex' à '-1' pour les rendre non focusables.
    dropdownContent.classList.contains('active') ? 
    focusableElements.forEach(element => element.setAttribute('tabindex', '0')) : 
    focusableElements.forEach(element => element.setAttribute('tabindex', '-1'));
};

// Pour chaque bouton de menu déroulant, ajoute un écouteur d'événements 'click' qui appelle les fonctions appropriées.
dropdownButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleDropdown(btn);
        closeOtherDropdowns(btn);
        focusableElements(btn);
    });
});
