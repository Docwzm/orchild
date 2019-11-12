import { Component, Vue } from 'vue-property-decorator';
import FieldPicker from '@/components/FieldPicker/FieldPicker';
import IncCircle from '@/components/IncCircle/IncCircle.vue';


@Component({
  components: {
    FieldPicker
  }
})
export default class Category extends Vue {
    value = 0;
    currentRate = 60;
    gradientColor = "#F89B3A";
    showPicker = false;
    columns = ['杭州', '宁波', '温州', '嘉兴', '湖州']
    get text() {
        return this.currentRate.toFixed(0) + '%'
    }

    lookLog() {
        this.$router.push({name:"BusinessList"});
    }
    onChange(picker:any, value:any, index:any) {
      }
      onConfirm(value:any) {
        this.value = value;
        this.showPicker = false;
      }
}
