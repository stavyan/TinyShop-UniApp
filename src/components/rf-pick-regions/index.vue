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
			:range="multiArray">
		{{ multiStr}}
	</picker>
</template>

<script>
    import {provinceList} from "@/api/basic";

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
                    return {}
                }
            }
        },
        data() {
            return {
                multiArray: [],
                multiIndex: [0, 0, 0],
                multiStr: '',
            }
        },
        mounted() {
            this.getProvinceList();
        },
        watch: {
            defaultLevel() {
                this.multiArray.length = 0;
                this.getProvinceList();
            },
            addressData(val, oldVar) {
                if (val !== oldVar) {
                    this.getProvinceList();
                }
            }
        },
        methods: {
            async getProvinceList() {
                let provinceIndex = 0;
                let cityIndex = 0;
                let areaIndex = 0;
                let province_name = null;
                let city_name = null;
                let area_name = null;
                await this.$get(`${provinceList}`).then(async r => {
                    this.multiArray[0] = r.data;
                    if (this.addressData.province_id) {
                        r.data.forEach((item, index) => {
                            if (parseInt(item.id, 10) === parseInt(this.addressData.province_id, 10)) {
                                provinceIndex = index;
                                this.addressData.province_id = item.id;
                                province_name = item.title;
                            }
                        });
                    } else {
                        this.addressData.province_id = this.multiArray[0][0].id
                        province_name = this.multiArray[0][0].title
                    }
                    this.multiIndex = [provinceIndex];
                    this.multiStr = `${province_name}`;
                    // if (this.defaultLevel == 1) return;
                    await this.$get(`${provinceList}`, {
                        pid: this.addressData.province_id
                    }).then(async r => {
                        this.multiArray[1] = r.data;
                        if (this.addressData.city_id) {
                            r.data.forEach((item, index) => {
                                if (parseInt(item.id, 10) == parseInt(this.addressData.city_id, 10)) {
                                    cityIndex = index;
                                    this.addressData.city_id = item.id;
                                    city_name = item.title;
                                }
                            });
                        } else {
                            this.addressData.city_id = this.multiArray[1][0].id;
                            city_name = this.multiArray[1][0].title;
                        }
                        this.multiIndex = [provinceIndex, cityIndex];
                        this.multiStr = `${province_name}, ${city_name}`;
                        // if (this.defaultLevel == 2) return;
                        await this.$get(`${provinceList}`, {
                            pid: this.addressData.city_id
                        }).then(r => {
                            this.multiArray[2] = r.data;
                            if (this.addressData.area_id) {
                                r.data.forEach((item, index) => {
                                    if (parseInt(item.id, 10) == parseInt(this.addressData.area_id, 10)) {
                                        areaIndex = index;
                                        this.addressData.area_id = item.id;
                                        area_name = item.title;
                                    }
                                });
                            } else {
                                this.addressData.area_id = this.multiArray[2][0].id;
                                area_name = this.multiArray[2][0].title;
                            }
                            if (this.defaultLevel == 1) {
                                this.addressData.area_id = null;
                                this.addressData.city_id = null;
                                this.multiArray.length = 1;
                                this.multiIndex = [provinceIndex];
                                this.multiStr = `${province_name}`;
                            } else if (this.defaultLevel == 2) {
                                this.addressData.area_id = null;
                                this.multiArray.length = 2;
                                this.multiIndex = [provinceIndex, cityIndex];
                                this.multiStr = `${province_name}, ${city_name}`;
                            } else {
                                this.multiArray.length = 3;
                                this.multiIndex = [provinceIndex, cityIndex, areaIndex];
                                this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
                            }
                            this.$emit('getRegions', this.addressData);
                        })
                    })
                })
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
                        switch (this.multiIndex[0]) {
                            case this.multiIndex[0]:
                                this.addressData.province_id = this.multiArray[0][e.detail.value].id;
                                province_name = this.multiArray[0][e.detail.value].title;
                                if (this.defaultLevel == 1) {
                                    this.multiIndex = [e.detail.value];
                                    this.multiStr = `${province_name}`;
                                    this.$emit('getRegions', this.addressData);
                                    return true;
                                }
                                await this.$get(`${provinceList}`, {
                                    pid: this.multiArray[0][e.detail.value].id
                                }).then(async r => {
                                    this.multiArray[1] = r.data;
                                    this.addressData.city_id = this.multiArray[1][0].id;
                                    city_name = this.multiArray[1][0].title;
                                    provinceIndex = e.detail.value;
                                    if (this.defaultLevel == 2) {
                                        this.multiIndex = [provinceIndex, 0];
                                        this.multiStr = `${province_name}, ${city_name}`;
                                        return true;
                                    }
                                    await this.$get(`${provinceList}`, {
                                        pid: this.multiArray[1][e.detail.column].id
                                    }).then(r => {
                                        this.multiArray[2] = r.data
                                        this.addressData.area_id = this.multiArray[2][0].id;
                                        area_name = this.multiArray[2][0].title;
                                        this.multiIndex = [provinceIndex, 0, 0];
                                        this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
                                    })
                                });
                                break
                        }
                        break;
                    case 1: //拖动第2列
                        switch (this.multiIndex[0]) { //判断第一列是什么
                            case this.multiIndex[0]:
                                switch (this.multiIndex[1]) {
                                    case this.multiIndex[1]:
                                        this.addressData.province_id = this.multiArray[0][this.multiIndex[0]].id;
                                        province_name = this.multiArray[0][this.multiIndex[0]].title;
                                        this.addressData.city_id = this.multiArray[1][e.detail.value].id;
                                        city_name = this.multiArray[1][e.detail.value].title;
                                        cityIndex = e.detail.value;
                                        if (this.defaultLevel == 2) {
                                            this.multiIndex = [this.multiIndex[0], cityIndex];
                                            this.multiStr = `${province_name}, ${city_name}`;
                                            this.$emit('getRegions', this.addressData);
                                            return true;
                                        }
                                        await this.$get(`${provinceList}`, {
                                            pid: this.multiArray[1][e.detail.value].id
                                        }).then(r => {
                                            this.multiArray[2] = r.data;
                                            this.addressData.area_id = this.multiArray[2][0].id;
                                            area_name = this.multiArray[2][0].title;
                                            this.multiIndex = [this.multiIndex[0], cityIndex, 0];
                                            this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
                                        });
                                        break
                                }
                                break
                        }
                        break;
                    case 2: //拖动第3列
                        switch (this.multiIndex[0]) { //判断第一列是什么
                            case this.multiIndex[0]:
                                switch (this.multiIndex[1]) {
                                    case this.multiIndex[1]:
                                        switch (this.multiIndex[2]) {
                                            case this.multiIndex[2]:
                                                this.addressData.province_id = this.multiArray[0][this.multiIndex[0]].id;
                                                province_name = this.multiArray[0][this.multiIndex[0]].title;
                                                this.addressData.city_id = this.multiArray[1][this.multiIndex[1]].id;
                                                city_name = this.multiArray[1][this.multiIndex[1]].title;
                                                this.addressData.area_id = this.multiArray[2][e.detail.value].id;
                                                area_name = this.multiArray[2][e.detail.value].title;
                                                areaIndex = e.detail.value;
                                                this.multiIndex = [this.multiIndex[0], this.multiIndex[1], areaIndex];
                                                this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
                                                break
                                        }
                                        break;
                                }
                                break
                        }
                        break
                }
                this.$emit('getRegions', this.addressData);
            },
        },
    }
</script>
