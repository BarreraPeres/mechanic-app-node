import { CustomFlowbiteTheme } from "flowbite-react";

export const datepickerTheme: CustomFlowbiteTheme["datepicker"] = {
    root: {
        base: "relative group", // Define a base "relative" para o root
        input: {
            base: "w-full rounded-lg bg-zinc-900 border border-gray-300 p-2  text-zinc-300 group-hover:bg-emerald-700", // Classe base para o input
            addon: "bg-zinc-900 text-white px-4 py-2", // Classe para addon de input
            field: {
                base: "bg-zinc-900 flex items-center space-x-2 group-hover:bg-emerald-700",
                icon: {
                    base: "text-gray-500 dark:text-gray-400 ", // Classe base para ícone
                    svg: "w-5 h-5", // Classe para o SVG do ícone
                },
                rightIcon: {
                    base: "ml-2 text-gray-500 dark:text-gray-400", // Classe para ícone à direita
                },
                input: {
                    base: "w-full px-3 py-2 text-gray-900  bg-zinc-900 rounded-lg group-hover:bg-emerald-800", // Classe base para o input de campo
                    colors: { gray: "bg-zinc-800 text-zinc-100 group-hover:text-zinc-300" }
                },

            },
        },
    },
    popup: {
        root: {
            base: "absolute  z-50 block mt-2",
            inline: "relative top-0 z-auto text-zinc-100",
            inner: "inline-block rounded-lg bg-zinc-900 p-4 shadow-lg  ", // Classe base para popup
        },
        header: {
            base: "",
            title: "px-2 py-3 text-center font-semibold text-zinc-100 dark:text-white", // Classe para o título
            selectors: {
                base: "mb-2 flex justify-between",
                button: {
                    base: "rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", // Classe base para os botões
                },
            },
        },
        view: {
            base: "p-1", // Classe base para a view
        },
        footer: {
            base: "mt-2 flex space-x-2", // Classe base para o rodapé
            button: {
                base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-emerald-300",
                today: "bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700", // Classe para o botão "Today"
                clear: "border border-gray-300 bg-zinc-900 text-zinc-300 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600", // Classe para o botão "Clear"
            },
        },
    },
    views: {
        days: {
            header: {
                base: "mb-1 grid grid-cols-7",
                title: "h-6 text-center text-sm font-medium leading-6 text-zinc-300 ", // Classe para o título de dias
            },
            items: {
                base: "grid w-64 grid-cols-7",
                item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-zinc-100 hover:bg-emerald-600 dark:text-white dark:hover:bg-gray-600", // Classe para item de dia
                    selected: "bg-emerald-800 text-white hover:bg-emerald-700", // Classe para o item selecionado
                    disabled: "text-zinc-100", // Classe para itens desabilitados
                },
            },
        },
        months: {
            items: {
                base: "grid w-64 grid-cols-4",
                item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600", // Classe para item de mês
                    selected: "bg-emerald-800 text-white hover:bg-emerald-700", // Classe para item de mês selecionado
                    disabled: "text-gray-500", // Classe para meses desabilitados
                },
            },
        },
        years: {
            items: {
                base: "grid w-64 grid-cols-4",
                item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600", // Classe para item de ano
                    selected: "bg-emerald-800 text-white hover:bg-emerald-700", // Classe para item de ano selecionado
                    disabled: "text-gray-500", // Classe para anos desabilitados
                },
            },
        },
        decades: {
            items: {
                base: "grid w-64 grid-cols-4",
                item: {
                    base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600", // Classe para item de década
                    selected: "bg-emerald-800 text-white hover:bg-emerald-700", // Classe para item de década selecionado
                    disabled: "text-gray-500", // Classe para décadas desabilitadas
                },
            },
        },
    },
}