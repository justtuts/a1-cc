import './app/scss/style.scss';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const main = document.querySelector('#main');
const footer = document.querySelector('#footer');
const btnOpen = document.querySelector('#btnOpen');
const menuTopNav = document.querySelector('#menuTopNav');
const btnClose = document.querySelector('#btnClose');
const overlay = document.querySelector('#overlay');
const breakpoint = window.matchMedia('(width < 43.75em)');

const setupTopNav = () => {
	if (breakpoint.matches) {
		// console.log('is mobile');
		menuTopNav.setAttribute('inert', '');
	} else {
		// console.log('is tablet or desktop');
		closeMobileMenu();
		menuTopNav.removeAttribute('inert');
	}
};

setupTopNav();

btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

breakpoint.addEventListener('change', () => {
	// console.log('breakpoint crossed');
	setupTopNav();
});

function openMobileMenu() {
	// console.log('run open mobile menu');
	btnOpen.setAttribute('aria-expanded', 'true');
	main.setAttribute('inert', '');
	footer.setAttribute('inert', '');
	menuTopNav.removeAttribute('inert'); // enables menu links when menu is open
	menuTopNav.style.transitionDuration = '400ms';
	overlay.style.transitionDuration = '400ms';
	disableBodyScroll(menuTopNav); //disables scrolling when menu is open
	btnClose.focus(); // auto focus on the close button for navigating with keyboard
}

function closeMobileMenu() {
	// console.log('run closeMobileMenu');
	btnOpen.setAttribute('aria-expanded', 'false');
	main.removeAttribute('inert');
	footer.removeAttribute('inert');
	menuTopNav.setAttribute('inert', ''); // disables the menu links when menu is closed
	enableBodyScroll(menuTopNav); // re-enables scrolling when menu is closed
	btnOpen.focus(); // auto focus on hamburger icon when menu is closed, for keyboard navigation

	setTimeout(() => {
		menuTopNav.removeAttribute('style');
		overlay.removeAttribute('style');
	}, 500);
}
