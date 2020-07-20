<template lang="pug">
b-modal(:id = 'id' title='Карточка группы', @show='onShowForm', @hidden='onHideForm', @ok='handleSave' size="lg")
	Loader(v-if="isLoading")
	form(v-else ref='form')
		.row
			b-form-group.col(label='Название группы:', invalid-feedback='Введите название гпуппы')
				b-form-input(v-if='!$v.group.is_individual.$model' v-model='$v.group.name.$model' type='text' :state="validateState($v.group.name)" v-bind:readonly='isReadonly')
				b-form-select(v-else v-model='$v.group.name.$model' :options='studentNames' v-bind:disabled='isExistedGroup' :state='validateState($v.group.name)')
		.row
			b-form-group.col-12(label='Тип группы:' )
				b-form-radio-group(v-model='$v.group.is_individual.$model' v-bind:disabled='isExistedGroup')
					b-form-radio(:value='false') Группа
					b-form-radio(:value='true') Индивидуально
	template(v-slot:modal-footer='{ edit, cancel, ok }')
		// Emulate built in modal footer ok and cancel button actions
		// Button with custom close trigger value
		b-button.mr-auto(v-if="isReadonly" variant='outline-primary', @click="isReadonly = false; changedToEdit = true") Изменить
		b-button.mr-auto(v-if="isExistedGroup && !isReadonly && !changedToDelete" variant='danger', @click="changedToDelete = true") Удалить
		b-button.mr-auto.shaked(v-if="isExistedGroup && !isReadonly && changedToDelete" variant='danger' @click="deleteGroup()") Удалить?
		b-button(v-if="changedToEdit" variant='secondary', @click='cancel()') Отменить
		b-button(v-if="changedToEdit" variant='primary', @click='ok()') Сохранить
		b-button(v-else variant='primary', @click='cancel()') Закрыть

</template>

<script>
import { required, minLength, alpha } from 'vuelidate/lib/validators'
import filterFio from '@/plugins/fio.filter'
import Loader from '~/components/Loader'
import Group from '~/js/group_class'
export default {
	model: {
		props: ['id', 'group_id'],
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		group_id: {
			type: String,
		},
	},
	components: {
		Loader,
	},
	validations: {
		group: {
			name: {
				required,
				minLength: minLength(2),
			},
			is_individual: {},
		},
	},
	data() {
		return {
			changedToDelete: false,
			isLoading: true,
			isReadonly: false,
			changedToEdit: false,
			group: null, //create onShow
			allStudents: [],
		}
	},
	computed: {
		studentNames() {
			//convert allStudents to names
			const a = this.allStudents.map((el) => filterFio(el, 'long'))
			return a
		},
		isExistedGroup() {
			return this.group_id !== ''
		},
	},
	methods: {
		validateState(p) {
			const { $dirty, $error } = p
			return $dirty ? !$error : null
		},

		checkFormValidity() {
			const is_valid = !this.$v.$invalid
			if (!is_valid) {
				this.$v.$touch()
			}
			return is_valid
		},
		getGroup() {
			return this.$store.getters['groups/groupByName'](this.group_id)
		},
		getAllStudents() {
			return this.$store.getters['students/students']
		},
		async onShowForm() {
			this.isLoading = true
			this.changedToDelete = false
			this.$v.$reset()
			this.isReadonly = this.isExistedGroup //if group exist->readonly
			if (this.getAllStudents().length == 0) {
				await this.$store.dispatch('students/fetchAll')
			}
			this.allStudents = this.getAllStudents()
			if (!this.isExistedGroup) {
				this.group = new Group()
				this.changedToEdit = true
			} else {
				//cache
				if (!this.getGroup().detailed) {
					await this.$store.dispatch('groups/fetchByName', this.group_id)
				}
				this.group = this.getGroup().clone()
			}

			this.isLoading = false
		},
		async onHideForm() {
			this.changedToDelete = false
			this.$v.$reset()
		},
		async handleSave(bvModalEvt) {
			// Prevent modal from closing
			bvModalEvt.preventDefault()
			// Trigger submit handler
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
				return
			}
			//new group
			if (!this.isExistedGroup) {
				//create group
				await this.$store.dispatch('groups/createGroup', this.group)
				//if individual group -> change group of individual student
				if (this.group.is_individual) {
					const s = this.getAllStudents().find(
						(el) => filterFio(el, 'long') === this.group.name
					)
					await this.$store.dispatch('students/changeGroup', {
						student: s,
						group_id: this.group.name,
					})
				}
			} else {
				//if group exist->only update group data
				await this.$store.dispatch('groups/updateGroup', {
					name: this.group_id,
					group: this.group,
				})
			}
			this.$nextTick(() => {
				this.$bvModal.hide(this.id)
			})
		},
		async deleteGroup() {
			this.isLoading = true
			await this.$store.dispatch('groups/deleteGroupByName', this.group_id)
			this.$nextTick(() => {
				this.$bvModal.hide(this.id)
			})
		},
	},
}
</script>
<style scoped>
.shaked {
	animation: shake 0.3s;
}
</style>
