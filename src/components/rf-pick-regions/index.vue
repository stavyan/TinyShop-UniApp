<template>
	<!--	<picker mode="multiSelector"-->
	<!--	        :value="multiIndex"-->
	<!--	        :range="multiArray"-->
	<!--	        @change="handleValueChange"-->
	<!--	        @columnchange="handleColumnChange">-->
	<!--		<slot></slot>-->
	<!--	</picker>-->
	<picker
		mode="multiSelector"
		@columnchange="bindMultiPickerColumnChange"
		:value="multiIndex"
		range-key="title"
		:range="multiArray"
	>
		{{ multiStr }}
	</picker>
</template>

<script>
/* eslint-disable */
import { provinceList } from '@/api/basic';
export default {
	props: {
		// defaultRegions: {
		//     type: Array,
		// }
		defaultLevel: {
			type: Number,
			default: 3
		},
		addressData: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			multiArray: [],
			multiIndex: [0, 0, 0],
			multiStr: ''
		};
	},
	mounted() {
	  this.$mHelper.log(this.addressData);
		this.getProvinceList();
	},
	methods: {
		async getProvinceList() {
			let provinceIndex = 0;
			let cityIndex = 0;
			let areaIndex = 0;
			let province_name = null;
			let city_name = null;
			let area_name = null;
			await this.$http.get(`${provinceList}`).then(async r => {
				this.multiArray[0] = r.data;
				if (this.addressData.province_id) {
					r.data.forEach((item, index) => {
						if (
							parseInt(item.id, 10) ===
							parseInt(this.addressData.province_id, 10)
						) {
							provinceIndex = index;
							this.addressData.province_id = item.id;
							province_name = item.title;
						}
					});
				} else {
					this.addressData.province_id = this.multiArray[0][0].id;
					province_name = this.multiArray[0][0].title;
				}
				await this.$http
					.get(`${provinceList}`, {
						pid: this.addressData.province_id
					})
					.then(async r => {
						this.multiArray[1] = r.data;
						if (this.addressData.city_id) {
							r.data.forEach((item, index) => {
								if (
									parseInt(item.id, 10) ==
									parseInt(this.addressData.city_id, 10)
								) {
									cityIndex = index;
									this.addressData.city_id = item.id;
									city_name = item.title;
								}
							});
						} else {
							this.addressData.city_id = this.multiArray[1][0].id;
							city_name = this.multiArray[1][0].title;
						}
						await this.$http
							.get(`${provinceList}`, {
								pid: this.addressData.city_id
							})
							.then(r => {
								this.multiArray[2] = r.data;
								if (this.addressData.area_id) {
									r.data.forEach((item, index) => {
										if (
											parseInt(item.id, 10) ==
											parseInt(this.addressData.area_id, 10)
										) {
											areaIndex = index;
											this.addressData.area_id = item.id;
											area_name = item.title;
										}
									});
								} else {
									this.addressData.area_id = this.multiArray[2][0].id;
									area_name = this.multiArray[2][0].title;
								}
								this.multiIndex = [provinceIndex, cityIndex, areaIndex];
								this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
								this.$emit('getRegions', this.addressData);
							});
					});
			});
		},
		async bindMultiPickerColumnChange(e) {
			this.multiIndex[e.detail.column] = e.detail.value;
			let provinceIndex = 0;
			let cityIndex = 0;
			let areaIndex = 0;
			let province_name = null;
			let city_name = null;
			let area_name = null;
			switch (e.detail.column) {
				case 0: //拖动第1列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            this.addressData.province_id = this.multiArray[0][
	            e.detail.value
            ].id;
            province_name = this.multiArray[0][e.detail.value].title;
            await this.$http
	            .get(`${provinceList}`, {
		            pid: this.multiArray[0][e.detail.value].id
	            })
	            .then(async r => {
		            this.multiArray[1] = r.data;
		            this.addressData.city_id = this.multiArray[1][0].id;
		            city_name = this.multiArray[1][0].title;
		            provinceIndex = e.detail.value;
		            await this.$http
			            .get(`${provinceList}`, {
				            pid: this.multiArray[1][e.detail.column].id
			            })
			            .then(r => {
				            this.multiArray[2] = r.data;
				            this.addressData.area_id = this.multiArray[2][0].id;
				            area_name = this.multiArray[2][0].title;
				            this.multiIndex = [provinceIndex, 0, 0];
				            this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
			            });
	            });
          }
					break;
				case 1: //拖动第2列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            if (this.multiIndex[1] === this.multiIndex[1]) {
              this.addressData.province_id = this.multiArray[0][
	              this.multiIndex[0]
              ].id;
              province_name = this.multiArray[0][this.multiIndex[0]].title;
              this.addressData.city_id = this.multiArray[1][
	              e.detail.value
              ].id;
              city_name = this.multiArray[1][e.detail.value].title;
              cityIndex = e.detail.value;
              await this.$http
	              .get(`${provinceList}`, {
		              pid: this.multiArray[1][e.detail.value].id
	              })
	              .then(r => {
		              this.multiArray[2] = r.data;
		              this.addressData.area_id = this.multiArray[2][0].id;
		              area_name = this.multiArray[2][0].title;
		              this.multiIndex = [this.multiIndex[0], cityIndex, 0];
		              this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
	              });
            }
          }
					break;
				case 2: //拖动第3列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            if (this.multiIndex[1] === this.multiIndex[1]) {
              if (this.multiIndex[2] === this.multiIndex[2]) {
                this.addressData.province_id = this.multiArray[0][
	                this.multiIndex[0]
                ].id;
                province_name = this.multiArray[0][this.multiIndex[0]]
	                .title;
                this.addressData.city_id = this.multiArray[1][
	                this.multiIndex[1]
                ].id;
                city_name = this.multiArray[1][this.multiIndex[1]].title;
                this.addressData.area_id = this.multiArray[2][
	                e.detail.value
                ].id;
                area_name = this.multiArray[2][e.detail.value].title;
                areaIndex = e.detail.value;
                this.multiIndex = [
	                this.multiIndex[0],
	                this.multiIndex[1],
	                areaIndex
                ];
                this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
              }
            }
          }
					break;
			}
			this.$emit('getRegions', this.addressData);
		}
	}
};
</script>
