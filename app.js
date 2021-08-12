// set variables
const message = (num) => {
    switch(num) {
        case 1: alert('Введите сокращенное наименование контрагента. Примеры: ООО "Техдеталь", ИП Иванов С.П.')
        break
        case 2: alert("Индивидуальный Номер Налогоплательщика, состоящий из 10 цифр для юридических лиц и 12 цифр для физических лиц (в том числе индивидуальных предпринимателей)")
        break
        case 3: alert("Выберите тип договора в соответствии с его предметом")
        break
        case 4: alert('Укажите цену и валюту договора. Например: "250 000 рублей", "100 000 долларов США", "500 000 евро". Если точную цену договора определить невозможно, укажите ориентировочную цену договора за один календарный год')
        break
        case 5: alert('Выберите "Новый контрагент", если у нас нет действующих договоров с данным контрагентом. Выберите "Новый договор с действующим контрагентом", если у нас есть действующий договор с данным контрагентом и мы планируем заключить с ним другой договор либо заключаем дополнительное соглашение о продлении действующего договора на новый срок". Выберите "Внеплановая проверка" в случае поступления в отношении контрагента существенной информации в определенных Политикой по проверке контрагентов случаях')
        break
        case 6: alert('Укажите, из каких источников вам стало известно о контрагенте. Например: "реклама в СМИ", "рекомендации деловых партнеров", "личный успешный опыт делового сотрудничества" и т.п.')
        break
        case 7: alert('Укажите URL адрес делового сайта контрагента. Например: "www.eurotech.com"')
        break
    }   
}
const date = new Date().toLocaleDateString()
const typeOfContract = document.getElementById("typeOfContract")
let isSubcontractors = false

// event listener that add and remove item "Копия договора с субподрядчиком" if "Договор подряда" или "Договор оказания услуг" selected
typeOfContract.addEventListener("change", (e) => {
    const newDiv = document.createElement("div")
    newDiv.setAttribute("id", "subcontractorDiv")
    newDiv.innerHTML = `<input type="checkbox" id="subcontractor" name="document" value="Копия договора с субподрядчиком">
        <label for="subcontractor">Копия договора с субподрядчиком</label>`
    const target = document.getElementById("licenseDiv")
    if(typeOfContract.value === "Договор подряда" || typeOfContract.value === "Договор оказания услуг") {
        if(!isSubcontractors){            
            target.insertAdjacentElement('afterend', newDiv)
            isSubcontractors = true
        }    
    } else {
        const parent = document.getElementById("subcontractorDiv")
        while (parent.firstChild) {
        parent.firstChild.remove()
        }
        isSubcontractors = false
    }
})

// function that create pdf form
const createForm = function() {
    const title = "Форма заявки на проверку контрагента"
    const author = document.getElementById("author")
    const company = document.getElementById("company")
    const typeOfEntity = document.getElementById("typeOfEntity")
    const inn = document.getElementById("inn")
    const typeOfChecking = document.getElementById("typeOfChecking")
    const price = document.getElementById("price")
    const currency = document.getElementById("currency")
    const source = document.getElementById("source")
    const site = document.getElementById("site")
    const documents = document.getElementsByName("document")
    documentsChecked = ''
    documentsUnchecked = ""
    documents.forEach(document => {
        if(document.checked){
            documentsChecked += ("+  " + document.value + "\n\n" )
        } else {
            documentsUnchecked += ("-  " + document.value + "\n\n" )
        }
    })
    
    const docInfo = {
        info: {
            title: title,
            author: author,
            subject: "Форма",
            keywords: "keywords"
        },

        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [50, 20, 30, 30],
    
        styles: {
            header: {
                fontSize: 16,
                bold: true
            }
        },

        content: [
            {
                text: "ЗАЯВКА \n на проведение проверки контрагента",
                margin: [0, 20],
                alignment: "center",
                style: ["header"]
            },
            {
                columns: [
                    {
                        text: `Наименование контрагента:  `,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${typeOfEntity.value} ${company.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `ИНН контрагента: `,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${inn.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `Вид договора:`,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${typeOfContract.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `Цена договора:`,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${price.value} ${currency.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `Тип проверки: `,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${typeOfChecking.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `Источник информации о контрагенте: `,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${source.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                columns: [
                    {
                        text: `Деловой сайт контрагента: `,
                        margin: [0, 5],
                        width: "50%"
                    },
                    {
                        text: `${site.value}`,
                        width: "50%",
                        margin: [0, 5]
                    }
                ]
            },
            {
                text: `Предоставленные контрагентом документы:`,
                margin: [0, 20, 0, 10],
                bold: true

            },
            {
                text: `${documentsChecked}`,
                margin: [10, 0]
            },
            {
                text: `На проверку не предоставлены:`,
                margin: [0, 20, 0, 10],
                bold: true
            },
            {
                text: `${documentsUnchecked}`,
                margin: [10, 0]
            },
            {
                columns: [
                    {
                        text: `${date}`,
                        width: "50%",
                        margin: [10, 30, 0, 0]
                    },
                    {
                        text: `${author.value}`,
                        width: "50%",
                        margin: [50, 30, 0, 0]
                    }
                ]
            },
        ]
    }
    pdfMake.createPdf(docInfo).download()
}
