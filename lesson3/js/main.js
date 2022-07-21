(() => {

const GOERLI_CHAIN_ID = '0x5';
const CONTRACT_ADDRESS = '0xBe9613b9Ed5Ca9c6E8A83Cfb6604dc9615074896';
const ABI = [
	{"inputs":[],"name":"stage","outputs":[{"internalType":"enum Lesson3Presale.PresaleStatus","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"currentPresalePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"availableForPresale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
	{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
	{"inputs":[],"name":"buyOnPresale","outputs":[],"stateMutability":"payable","type":"function"},
];

const STATUSES = {
	0: 'Не начат',
	1: 'Этап 1',
	2: 'Этап 2',
	3: 'Окончен',
};
const HOURGLASS = String.fromCodePoint(8987);

const formatEther = ethers.utils.formatEther;

let account = null;
let provider = null;
let contract = null;
const readContract = new ethers.Contract(
	CONTRACT_ADDRESS,
	ABI,
	new ethers.providers.InfuraProvider('goerli'),
);

const JS_HIDDEN = 'js-hidden';

let loggedIn = false;
let curPrice = 0n;
let curBalance = 0n;
let curAvailable = 0n;

const infoStatus = document.body.querySelector('#info-status td:last-child');
const infoPrice = document.body.querySelector('#info-price td:last-child');
const infoAvailable = document.body.querySelector('#info-available td:last-child');
const infoBalanceWrapper = document.body.querySelector('#info-balance');
const infoBalance = document.body.querySelector('#info-balance td:last-child');
const infoTokenBalanceWrapper = document.body.querySelector('#info-token-balance');
const infoTokenBalance = document.body.querySelector('#info-token-balance td:last-child');

const authButton = document.body.querySelector('#auth');
const amountInput = document.body.querySelector('#amount');
const tokensInput = document.body.querySelector('#tokens');
const buyButton = document.body.querySelector('#buy');
const output = document.body.querySelector('output > strong');

const rocket = document.body.querySelector('#rocket-wrap');

const chainIdListener = (chainId) => {
	if (chainId !== GOERLI_CHAIN_ID) {
		output.classList.add('error');
		output.textContent = 'Пожалуйста, переключитесь на тестовую сеть Goerli';
	}
	else if (output.classList.contains('error')) {
		output.classList.remove('error');
		output.textContent = 'Можете продолжить покупки';
	}
}

const accountsListener = () => {
	loggedIn = false;
	login();
}

const login = async () => {
	try {
		if (loggedIn === true) {
			throw new Error('Вы уже вошли в систему');
		}

		output.textContent = '';
		output.classList.remove('error');
		authButton.disabled = true;

		if (window.ethereum) {
			provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			account = accounts?.[0];
			if (!account) {
				throw new Error('Выберите аккаунт для работы');
			}

			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			if (chainId !== GOERLI_CHAIN_ID) {
				throw new Error('Пожалуйста, переключитесь на тестовую сеть Goerli');
			}

			window.ethereum.removeListener('chainChanged', chainIdListener);
			window.ethereum.on('chainChanged', chainIdListener);
			window.ethereum.removeListener('accountsChanged', accountsListener);
			window.ethereum.on('accountsChanged', accountsListener);

			const signer = provider.getSigner(account);
			contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

			loggedIn = true;
			authButton.textContent = 'Выйти';
			amountInput.disabled = false;
			tokensInput.disabled = false;
			buyButton.disabled = false;

			fetchBalance();
			fetchTokenBalance();
			infoBalanceWrapper.classList.remove(JS_HIDDEN);
			infoTokenBalanceWrapper.classList.remove(JS_HIDDEN);

			output.textContent = 'Можете приступать к покупкам';
			rocket.classList.add('rotated');
		}
		else if (window.web3) {
			throw new Error('Пожалуйста, обновите расширение MetaMask для вашего браузера');
		} else {
			throw new Error('Пожалуйста, установите расширение MetaMask для вашего браузера');
		}
	}
	catch (err) {
		output.classList.add('error');
		output.textContent = err?.data?.message || err?.message || 'Неизвестная ошибка';
	}
	finally {
		authButton.disabled = false;
	}
};

const logout = () => {
	try {
		if (loggedIn === false) {
			throw new Error('Вы уже вышли из системы');
		}

		output.textContent = '';
		output.classList.remove('error');
		authButton.disabled = true;
		amountInput.value = '';
		amountInput.disabled = true;
		amountInput.value = '';
		tokensInput.disabled = true;
		buyButton.disabled = true;

		account = null;
		contract = null;
		provider = null;
		window.ethereum.removeListener('chainChanged', chainIdListener);
		window.ethereum.removeListener('accountsChanged', accountsListener);

		loggedIn = false;
		infoBalanceWrapper.classList.add(JS_HIDDEN);
		infoTokenBalanceWrapper.classList.add(JS_HIDDEN);
		output.textContent = 'Для участия в пресейле необходимо авторизоваться';
		authButton.textContent = 'Войти';
		rocket.classList.remove('rotated');
	}
	catch (err) {
		output.classList.add('error');
		output.textContent = err?.data?.message || err?.message || 'Неизвестная ошибка';
	}
	finally {
		authButton.disabled = false;
	}
};

const buy = async () => {
	try {
		authButton.disabled = true;
		amountInput.disabled = true;
		tokensInput.disabled = true;
		buyButton.disabled = true;

		output.textContent = '';
		output.classList.remove('error');

		if (!contract) {
			throw new Error('Тысяча извинений. Кажется приложение сломано(');
		}

		const amount = amountInput.value;
		if (!amount) {
			throw new Error('Пожалуйста введите сумму для инвестиций');
		}

		let num = Number(amount);
		if (num === 0) {
			throw new Error('Пожалуйста введите неотрицательную сумму сумму');
		}
		if (!num) {
			num = Number(amount.replace(',', '.'));
			if (!num) {
				throw new Error('Пожалуйста введите корректную сумму сумму');
			}
		}
		if (num < 0) {
			throw new Error('Пожалуйста введите неотрицательную сумму сумму');
		}

		output.textContent = HOURGLASS + ' Ожидание выполнения транзакции ' + HOURGLASS;

		const value = ethers.utils.parseEther(String(num));
		const tAmount = (BigInt(value) * 10n**18n) / curPrice;
		if (tAmount < 1n) {
			throw new Error('Введена слишком маленькая сумма');
		}
		if (BigInt(value) >= curBalance) {
			throw new Error('Недостаточно средств');
		}
		if (tAmount >= curAvailable) {
			throw new Error('Превышает лимит пресейла');
		}

		const tx = await contract.buyOnPresale({ value });
		await tx.wait();

		fetchInfo();

		output.textContent = 'Покупка успешно завершена';
	}
	catch (err) {
		output.classList.add('error');
		output.textContent = err?.data?.message || err?.message || 'Неизвестная ошибка';
	}
	finally {
		authButton.disabled = false;
		amountInput.disabled = false;
		tokensInput.disabled = false;
		buyButton.disabled = false;
	}
}

const fetchStatus = async (c) => {
	infoStatus.textContent = HOURGLASS;
	try {
		const stage = await c.stage();
		infoStatus.textContent = STATUSES[stage];
	} catch {
		infoStatus.textContent = 'Не удалось загрузить данные';
	}
}

const fetchPrice = async (c) => {
	infoPrice.textContent = HOURGLASS;
	try {
		const stage = await c.stage();
		if (stage !== 1 && stage !== 2) {
			infoPrice.textContent = '-';
			return;
		}

		const price = await c.currentPresalePrice();
		curPrice = BigInt(price);
		infoPrice.textContent = formatEther(curPrice) + ' ETH';
	} catch {
		infoPrice.textContent = 'Не удалось загрузить данные';
	}
}

const fetchAvailable = async (c) => {
	infoAvailable.textContent = HOURGLASS;
	try {
		const available = await c.availableForPresale();
		curAvailable = BigInt(available);
		infoAvailable.textContent = formatEther(available) + ' L3P';
	} catch {
		infoAvailable.textContent = 'Не удалось загрузить данные';
	}
}

const fetchBalance = async () => {
	if (account && provider) {
		infoBalance.textContent = HOURGLASS;
		try {
			const balance = await provider.getBalance(account);
			curBalance = BigInt(balance);
			infoBalance.textContent = formatEther(balance) + ' ETH';
		} catch {
			infoBalance.textContent = 'Не удалось загрузить данные';
		}
	}
}

const fetchTokenBalance = async () => {
	if (account && contract) {
		infoTokenBalance.textContent = HOURGLASS;
		try {
			const tokenBalance = await contract.balanceOf(account);
			infoTokenBalance.textContent = formatEther(tokenBalance) + ' L3P';
		} catch {
			infoTokenBalance.textContent = 'Не удалось загрузить данные';
		}
	}
}

const fetchInfo = () => {
	const c = contract || readContract;
	fetchStatus(c);
	fetchPrice(c);
	fetchAvailable(c);
	fetchBalance();
	fetchTokenBalance();
}

authButton.addEventListener('click', () => {
	loggedIn === true ? logout() : login();
});

buyButton.addEventListener('click', buy);

amountInput.addEventListener('input', () => {
	const amount = amountInput.value;
	if (!amount) {
		tokensInput.value = '';
		return;
	}

	let num = Number(amount);
	if (num === 0) {
		tokensInput.value = '';
		return;
	}
	if (!num) {
		num = Number(amount.replace(',', '.'));
		if (!num) {
			tokensInput.value = '';
			return;
		}
	}
	if (num < 0) {
		tokensInput.value = '';
		return;
	}

	const value = ethers.utils.parseEther(String(num));
	const tAmount = (BigInt(value) * 10n**18n) / curPrice;
	if (tAmount < 1n) {
		tokensInput.value = '';
		return;
	}

	tokensInput.value = formatEther(tAmount.toString());
});

tokensInput.addEventListener('input', () => {
	const tokensAmount = tokensInput.value;
	if (!tokensAmount) {
		amountInput.value = '';
		return;
	}

	let num = Number(tokensAmount);
	if (num === 0) {
		tokensInput.value = '';
		return;
	}
	if (!num) {
		num = Number(tokensAmount.replace(',', '.'));
		if (!num) {
			amountInput.value = '';
			return;
		}
	}
	if (num < 0) {
		amountInput.value = '';
		return;
	}

	const tAmount = BigInt(ethers.utils.parseEther(String(num)));
	const ethAmount = (tAmount * curPrice) / 10n ** 18n;
	if (ethAmount < 1n) {
		amountInput.value = '';
		return;
	}

	amountInput.value = formatEther(ethAmount.toString());
});

document.addEventListener('DOMContentLoaded', fetchInfo, {once: true});

})();
