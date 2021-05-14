import { Quote } from './Quote.js';

class Game {
	currentStep = 0;
	lastStep = 7;

	/* tablica składająca się z obiektów które badziemy losować */
	quotes = [
		{
			text: 'parówa',
			category: 'Przezwisko Ewelci',
		},
		{
			text: 'kolczatka',
			category: 'Element garderoby Ewelci',
		},
		{
			text: 'kiełbaska i kabanos',
			category: 'Ulubione jedzenie Ewelci',
		},
		{
			text: 'Ewelciuje',
			category: 'Ewelcia robi to czesto',
		},
		{
			text: 'kaktus',
			category: 'Przezwisko Ewelci',
		},
		{
			text: 'YuuHuu',
			category: 'Radosna Ewelcia mówi',
		},
		{
			text: 'o fuck',
			category: 'zdziwiona Ewelcia mówi',
		},
		{
			text: 'łapa dinozaura',
			category: 'Ewelci Broń',
		},
		{
			text: 'kikuta',
			category: 'Jak się ewelcia zdenerwuje to dostaniesz z....',
		},
		{
			text: 'bedzie lało',
			category: 'kikut swędzi',
		},
	];

	constructor(lettersWrapper, categoryWrapper, wordWrapper, outputWrapper) {
		this.lettersWrapper = lettersWrapper;
		this.categoryWrapper = categoryWrapper;
		this.wordWrapper = wordWrapper;
		this.outputWrapper = outputWrapper;

		const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)]; // losujemy obiekt i przypisujemy do zmiennych
		/* const { text, category } equal one of this:
		{text: 'guwno',
		category: 'śmierdzi z błędem'} a my losujemy które to będzie   */
		this.categoryWrapper.innerHTML = category; // przypisujemy category do naszego wraperra
		this.quote = new Quote(text);
	}
	/* -------------- Make buttons from letters -------------------*/

	guess(letter, event) {
		if (this.quote.guess(letter)) {
			this.drawQuote();
		} else {
			this.currentStep++;
			document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
			if (this.currentStep == this.lastStep) {
				this.loosing();
			}
		} // metoda guess która jako argument przyjmuje naszą litere = label

		event.target.disabled = true; //wyłączenie liter które już wybraliśmy
	}

	drawLetters() {
		for (let i = 0; i < 26; i++) {
			const label = (i + 10).toString(36); // zamieniuamy liczbę na literę dzięki metodzie to string 10 -> A, 11->B itd
			const button = document.createElement('button'); // tworzymy element hthml button
			button.innerHTML = label; // do każdego butoona doajemy kolejną litrkę w pętli
			/*  */
			button.addEventListener('click', (event) => this.guess(label, event)); //po kliknięciu odpala się funkcja guess która jako argument przyjmuje naszą literkę
			this.lettersWrapper.appendChild(button); //dodajemy nasz button do lettersWrapper czyli naszej klasy letters
		}
	}

	drawQuote() {
		const content = this.quote.getContent(); //przpisanie motody zaimportowanej z Quote do zmiennej const
		this.wordWrapper.innerHTML = content; //Przypisanie do naszego word wrpapera żeby wyświetlić w oknie
		if (!content.includes('_')) {
			this.winning();
		}
	}

	start() {
		document.getElementsByClassName('step')[this.currentStep].style.opacity = 1; // biuerzemy nasz step z html i zmieniamy opacity biecego elemnyu na 1
		this.drawLetters(); // wywołanie metody która rysuje litery na plnaszy
		this.drawQuote(); // wywołanie metody drawQuote która odpowiada za wpisanie liter w okno jeśli zgadniemy a jeśli nie to pozostawić puste miejsce
	}

	winning() {
		this.wordWrapper.innerHTML = 'GRATULACJE! KONIEC GRY';
		this.lettersWrapper.innerHTML = '';
	}

	loosing() {
		this.wordWrapper.innerHTML = 'NIESTETY PRZEGRYWASZ TO KONIEC GRY!';
		this.lettersWrapper.innerHTML = '';
	}
}
const game = new Game(
	document.getElementById('letters'),
	document.getElementById('category'),
	document.getElementById('word'),
	document.getElementById('output')
);

game.start();
