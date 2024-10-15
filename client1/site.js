fetch('/api/site/delete', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
  body: JSON.stringify({
    id:3,
	}),
})
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		console.log(data)
	})
fetch('/api/site/list')
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		console.log('site',data)
	})
