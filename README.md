# silent-apply 

介绍silent-apply

	require('silent-apply')
	
	function test1() {
		console.log('test func1)
	}

	function test2() {
		console.log('test func2: this is a error function', a)
	}

	function test3() {
		console.log('test func3')
	}

	// call three function. the test2 function have exception. cause by test3 can't be execute.
	test1()
	test2()
	test3()

	// you can execute function by silent-apply with xapply
	test1.xapply()
	test2.xapply()
	test3.xapply()


	