import Vue from 'vue'
import filterFio from '@/plugins/fio.filter'
Vue.filter('fio', filterFio) //register new filter with name "currency"
