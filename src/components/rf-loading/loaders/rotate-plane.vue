<template>
	<view>
		<view
			:style="{
				backgroundColor: color,
				width: size + 20 + 'px',
				height: size + 20 + 'px'
			}"
			class="spinner-inside"
		></view>
	</view>
</template>

<script>
export default {
	name: 'rotatePlane',
	props: {
		color: String,
		size: Number
	}
};
</script>

<style scoped>
.spinner-inside {
	margin: 25px auto;

	-webkit-animation: rotateplane 1.2s infinite ease-in-out;
	animation: rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes rotateplane {
	0% {
		-webkit-transform: perspective(120px);
	}
	50% {
		-webkit-transform: perspective(120px) rotateY(180deg);
	}
	100% {
		-webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
	}
}

@keyframes rotateplane {
	0% {
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	}
	50% {
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	}
	100% {
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
}
</style>
