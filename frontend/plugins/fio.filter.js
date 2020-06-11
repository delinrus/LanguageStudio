export default function filterFio(obj, format = 'short') {
  if (format.includes('short')) {
    return `${obj.family} ${obj.name}`
  }
  return `${obj.family} ${obj.name} ${obj.patronymic}`
}
