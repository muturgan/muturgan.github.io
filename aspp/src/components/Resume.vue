<template>
	<div class="sheet">
      <div class="header">
         <h3> Сахаров Андрей Александрович </h3>
         <h4> Node.js backend разработчик </h4>
      </div>
      <br>

      <div class="photo">
         <img
            alt="My photo"
            :src=" basePath + '/aspp/img/photo.jpg' "
            width="57.9"
            height="71.7"
         >
      </div>

      <div class="personal-information">
         <pre>
г.Тула. Дата рождения: 26.04.1987
Женат, есть ребенок

Телефон: +7-(950)-906-14-40
e-mail: caxap_8787@mail.ru

Образование
– высшее (специалист) 2010г.
Тулский Государственный Университет,
Институт высокоточных систем им. В.П. Грязева,
специальность «Электроснабжение»

– высшее (магистр) 2022г.
Тулский Государственный Университет,
Институт прикладной математики и компьютерных наук,
специальность Программная инженерия</pre>
      </div>

      <div class="expirience-and-skills">
         <pre>Работал на различных предприятиях в отрасли электроэнергетики.
С января 2018г. самостоятельно изучаю web-технологий с приоритетом JavaScript, Vue.js.

За период обучения мною был разработан ряд проектов, наиболееинтересные из которых:
<a :href="basePath + '/my_learning_project/'" target="_blank">{{ basePath }}/my_learning_project/</a> - SPA с написанием графических компонентов
в объектно-ориентированном стиле, генерация разметки на основе полученных с сервера json-данных;
<a :href="basePath + '/barley-break/'" target="_blank">{{ basePath }}/barley-break/</a> - игра "пятнашки";
<a :href="basePath + '/accords/'" target="_blank">{{ basePath }}/accords/</a> - игра сервис по автоматическому транспонированию аккордов;

С кодом можно ознакомиться по ссылке:
<a href="https://github.com/muturgan/muturgan.github.io" target="_blank">https://github.com/muturgan/muturgan.github.io</a>

В настоящее время занимаюсь изучением фреймворка Vue.js.


  Навыки:
- Уверенное знание JavaScript, умение применять возможности стандарта ES6+;
- Знание HTML5 и CSS3 (включая flexbox и grid);
- Умение использовать систему контроля версий Git;
- Умение использовать систему сборки WebPack;
- Владение английским языком на уровне чтения технической литературы;
- Высокая мотивация к саморазвитию в новой сфере деятельности;


Желаемый уровень заработной платы:
100000 руб. (после вычета налогов).
</pre>
      </div>
   </div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
      data(){
			return {
				basePath: 'https://muturgan.github.io',
			}
		},
   }
</script>

<style scoped>
.sheet{
   --coef: 4;
	--sheet-width: calc( var(--coef) * 210px );
   --sheet-height: calc( 1.414 * var(--sheet-width) );
   
   padding: calc(0.08 * var(--sheet-width));
	margin: calc(0.08 * var(--sheet-width));
	text-align:center;
	width: var(--sheet-width);
   height: var(--sheet-height);
	box-sizing: border-box;
	background-color: rgb(243,241,210);
	border: 1px solid grey;
   box-shadow:
      0 0 60px 20px var(--vue-green),
      inset 0 0 calc(0.6 * var(--sheet-width)) calc(0.03 * var(--sheet-width)) rgb(226,222,150);
}
img {
   float: left;
   width: calc(0.224 * var(--sheet-width));/*0.172*/
   height: calc(0.270 * var(--sheet-width));/*0.207*/
   margin-top: calc(0.02 * var(--sheet-width));
   margin-right: calc(0.04 * var(--sheet-width));
   background-color: rgb(227,156,190);
   border: 1px solid grey;
   color: black;
}
h3 {
   margin: 0;
   font-size: calc(0.024 * var(--sheet-width));
   text-align: center;
}
h4 {
   margin: 0;
   font-size: calc(0.020 * var(--sheet-width));
   text-align: center;
}
pre, p, span {
   margin: 25 0 0 0;
   font-size: calc(0.017 * var(--sheet-width));
   text-align: left;
   font-family: Arial, sans-serif;
}
</style>