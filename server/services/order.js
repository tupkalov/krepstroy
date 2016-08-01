let dateFormat = require('dateformat'), fs = require('fs');

module.exports = co.wrap(function* ({

		basket, name, tel, organization, inn, additional, address

	}) {

		let ID = yield MONGO.collection('orders').find().count()

		let saveModelPromise = MONGO.collection('orders').insertOne({
			basket, name, tel, organization, inn, additional, address
		})

		let xmlObject = {

			root : [{
				КОНТРАГЕНТЫ : [{
					КОНТРАГЕНТ : {
						_attr : { 
							ID, 
							"НАИМЕНОВАНИЕ" 	: name, 
							"ИНН" 			: inn,
							"КПП" 			: "",
							"ЮРАДРЕС" 		: address,
							"ТЕЛЕФОН" 		: tel
						}
					}
				}]
			},
			{
				"ДОКУМЕНТЫ" : [{
					"ЗАКАЗ" : [{
						"Шапка" : [{
							"Номер" 			: `"${ID}"`,
							"Дата" 				: `"${dateFormat("dd.mm.yyyy")}`,
							"КОНТРАГЕНТ_ID" 	: `"${ID}"`,
							"АДРЕС_ДОСТАВКИ"	: `"${address}"`
						}],

						"Таблица" : basket.map( (item, index) => ({
							"Строка" : {
								"НомерСтроки" 	: index + 1,
								"ТОВАР_ID"	  	: `"${item.good.cid}"`,
								"КОЛИЧЕСТВО" 	: item.count,
								"ЦЕНА"			: item.price,
								"СУММА"			: item.count * item.price
							}
						}))
					}]
				}]
			}]
			
		}

		let xmlString = `
<root>
	<КОНТРАГЕНТЫ>
		<КОНТРАГЕНТ ID="${ID}" НАИМЕНОВАНИЕ="${name}" ИНН="${inn}" КПП="" ЮРАДРЕС="${address || ''}" ТЕЛЕФОН="${tel}"/>
	</КОНТРАГЕНТЫ>

	<ДОКУМЕНТЫ>
		<ЗАКАЗ>
			<Шапка>
				<Номер>"${ID}"</Номер>
				<Дата>"${dateFormat("dd.mm.yyyy")}"</Дата>
				<КОНТРАГЕНТ_ID>"${ID}"</КОНТРАГЕНТ_ID>
				<АДРЕС_ДОСТАВКИ>"${address || ''}"</АДРЕС_ДОСТАВКИ>
			</Шапка>
			<Таблица>` + 
								
				basket.map((item, num) => `
				<Строка>
					<НомерСтроки>${num+1}</НомерСтроки>
					<ТОВАР_ID>"${item.good.cid}"</ТОВАР_ID>
					<КОЛИЧЕСТВО>${item.count}</КОЛИЧЕСТВО>
					<ЦЕНА>${item.good.price}</ЦЕНА>
					<СУММА>${item.count * item.price}</СУММА>
				</Строка>`).join('') + 

			`</Таблица>
		</ЗАКАЗ>
	</ДОКУМЕНТЫ>
</root>
		`;


		let relativeUrl = `/uploads/order_${ID}.xml`,
			absUrl	= __appdir + relativeUrl;

		// fileSave
		yield new Promise((resolve , reject) => {

			fs.writeFile(absUrl, xmlString, 
				error => error ? reject(error) : resolve()
			);

		});
		// get url of file
		let link = `http://${App.config.host}${relativeUrl}`;

		yield saveModelPromise;

		return {
			id : ID,
			emailText : 

				`Контактное лицо: ${name}\n` +
				`Телефон: ${tel}\n` +
				`Организация: ${organization || ''}\n` +
				`ИНН: ${inn || ''}\n`+
				`Дополнительно: ${additional || ''}\n\n` +
				`Заказ\n` +
				basket.map(item => 
					`${item.good.cid}\t${item.good.name}\t${item.count} x ${item.good.price}р.`
				).join('\n') + '\n\n\n' + 

				`Сумма: ${basket.reduce( (prev, item) => prev + (item.good.price * item.count), 0 )}р.\n\n` + 
				`Ссылка на файл заказа: ${link}`,

			fileUrl : absUrl
		}

	})

/*
`Контактное лицо: ${name}\n` +
				`Телефон: ${tel}\n` +
				`Организация: ${organization}\n` +
				`ИНН: ${inn}\n`+
				`Дополнительно: ${additional}\n\n` +
				`Заказ\n` +
				basket.map(item => 
					`${item.good.cid}\t${item.good.name}\t${item.count} x ${item.good.price}р.`
				).join('\n') + '\n\n\n' + 

				`Сумма: ${basket.reduce( (prev, val) => prev + val )}.`
 */

/*

 */