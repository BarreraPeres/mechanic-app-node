export function renderStatus(status: string): { color: string, nameInPortuguese: string } {
    if (status === "PENDING") {
        const color = "bg-yellow-100 text-yellow-800"
        const nameInPortuguese = "Pendente"
        return {
            color,
            nameInPortuguese
        }
    } else if (status === "IN_PROGRESS" || status === "SCHEDULED") {
        const color = "bg-green-100 text-green-800"
        const nameInPortuguese = "Aceito"

        return {
            color,
            nameInPortuguese
        }
    } else {
        const color = "bg-red-100 text-red-800"
        const nameInPortuguese = "Finalizado"
        return {
            color,
            nameInPortuguese
        }
    }

}