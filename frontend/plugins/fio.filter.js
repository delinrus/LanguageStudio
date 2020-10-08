export default function filterFio(obj, format = 'short') {
	if (format.includes('short')) {
		return `${obj.family} ${obj.name}`
	} else if (format.includes('fio')) {
		return `${obj.family} ${obj.name[0]}.`
	}
	return `${obj.family} ${obj.name} ${obj.patronymic}`
}
