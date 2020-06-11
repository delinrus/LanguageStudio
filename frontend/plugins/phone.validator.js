export default function phoneValidator(value) {
	if (!value) return true
	return !!value.trim().match(/^((\+7[0-9]{10})|(8[0-9]{10})|([0-9]{6}))$/)
}
