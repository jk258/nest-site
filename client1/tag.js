fetch('/api/tag/create', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
  body: JSON.stringify({
    title: '前端',
  }),
})
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		console.log(data)
	})
// fetch('/api/tag/update', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
//   body: JSON.stringify({
//     id: '1',
// 		title: 'vue',
// 	}),
// })
// 	.then((res) => {
// 		return res.json()
// 	})
// 	.then((data) => {
// 		console.log(data)
// 	})
  
// fetch('/api/tag/delete', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({
// 		id: 7,
// 	}),
// }).then(res=>res.json()).then(data=>{
//   console.log(data)
// })
  fetch('/api/tag/list')
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			console.log(data)
		})


