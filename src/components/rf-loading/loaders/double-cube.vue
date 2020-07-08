<template>
	<view>
		<view
			class="spinner-inside"
			:style="{
				width: size + 'px',
				height: size + 'px'
			}"
		>
			<view
				:style="{
					backgroundColor: color,
					width: size - 10 + 'px',
					height: size - 10 + 'px'
				}"
				class="cube1"
			></view>
			<view
				:style="{
					backgroundColor: color,
					width: size - 10 + 'px',
					height: size - 10 + 'px'
				}"
				class="cube2"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'doubleCube',
	props: {
		color: String,
		size: Number
	}
};
</script>

<style scoped>
.spinner-inside {
	margin: 50% auto;
	position: relative;
	transform: translate(-50%, -50%);
}

.cube1,
.cube2 {
	position: absolute;
	top: 0;
	left: 0;

	-webkit-animation: cubemove 1.8s infinite ease-in-out;
	animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
	-webkit-animation-delay: -0.9s;
	animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
	25% {
		-webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
	}
	50% {
		-webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
	}
	75% {
		-webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
			scale(0.5);
	}
	100% {
		-webkit-transform: rotate(-360deg);
	}
}

@keyframes cubemove {
	25% {
		transform: translateX(42px) rotate(-90deg) scale(0.5);
		-webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
	}
	50% {
		transform: translateX(42px) translateY(42px) rotate(-179deg);
		-webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
	}
	50.1% {
		transform: translateX(42px) translateY(42px) rotate(-180deg);
		-webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
	}
	75% {
		transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
		-webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
			scale(0.5);
	}
	100% {
		transform: rotate(-360deg);
		-webkit-transform: rotate(-360deg);
	}
}
</style>
