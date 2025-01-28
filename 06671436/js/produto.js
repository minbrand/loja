setcookie('paginaAtual','produto');
function toggleFullScreen(){
	document.requestFullscreen();
  }
//AVALIAÃ‡Ã•ES
function avaliaÃ§Ã£o(id,fullid,aÃ§Ã£o){
	corForte = $('#corForte').text();
	corFraca = $('#corFraca').text();
	
	corLike = $('#corLike'+id).css('color');
	corUnlike = $('#corUnlike'+id).css('color');
	
	likes = $('#likes'+id).text();
	unlikes = $('#unlikes'+id).text();
	
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: "POST",async: true,data: 'metodo=avaliaÃ§Ã£o&id='+id+'&fullid='+fullid+'&aÃ§Ã£o='+aÃ§Ã£o+'&corForte='+corForte+'&corFraca='+corFraca+'&corLike='+corLike+'&corUnlike='+corUnlike+'&likes='+likes+'&unlikes='+unlikes,dataType: "html",
		success: function(resposta){ resposta = resposta.trim();	
			/* console.log(resposta); */
			resposta = resposta.split('|');
			$('#likes'+id).text(resposta[0]);
			$('#unlikes'+id).text(resposta[1]);
			
			$('.corLike'+id).css('color',resposta[2]);
			$('#corLike'+id).css('color',resposta[2]);
			$('#botaoLike'+id).css('border-color',resposta[2]);
			
			$('.corUnlike'+id).css('color',resposta[3]);
			$('#corUnlike'+id).css('color',resposta[3]);
			$('#botaoUnlike'+id).css('border-color',resposta[3]);

			}
		});
	return;
	}
function selecionarVariaÃ§Ã£o(fullid,variaÃ§Ã£o,atributo,ir){
	let totalDeAtributosDaVariaÃ§Ã£o = $('.totalDeAtributosDaVariaÃ§Ã£o'+variaÃ§Ã£o).text();
	for(c=0;c<totalDeAtributosDaVariaÃ§Ã£o;c++){
		if(parseInt(c)==parseInt(atributo)){
			$('.variaÃ§Ã£o'+variaÃ§Ã£o+'atributo'+atributo).css('border','solid 2px #3483fa');
			}else{
				$('.variaÃ§Ã£o'+variaÃ§Ã£o+'atributo'+c).css('border','dashed 1px rgba(0,0,0,.25)');
				}
		}
	textoDoAtributo = $('.textovariaÃ§Ã£o'+variaÃ§Ã£o+'atributo'+atributo).text();
	$('.atributoDaVariaÃ§Ã£o'+variaÃ§Ã£o).text(textoDoAtributo);
	
	imagemDoAtributo = $('.imagemvariaÃ§Ã£o'+variaÃ§Ã£o+'atributo'+atributo).text();
	$('.imagemDaVariaÃ§Ã£o'+variaÃ§Ã£o).css('background-image','url("'+imagemDoAtributo+'")');
	
	fullidAtributo = $('.fullidvariaÃ§Ã£o'+variaÃ§Ã£o+'atributo'+atributo).text();
	if(fullidAtributo.length==9 && ir!='nÃ£o'){
		window.location.href = 'https://'+$('#dominio').text()+'/'+fullidAtributo;
		}
	return;
	}
function selecionarQuantidade(quantidade){
	if(quantidade=='manual'){
		quantidade = $('.quantidadePersonalizada').val();
		$('.quantidadeEscolhida').text(quantidade);	
		modal("modalQuantidade");	
		setTimeout(function(){
			quantidadeManual();
			},150);
		$('.quantidadePersonalizada').val('')
		return;
		}
	$('.quantidadeEscolhida').text(quantidade);
	modal("modalQuantidade");
	return;
	}
function quantidadeManual(){
	if($('.listaDeQuantidades').css('display')=='flex'){
		$('.listaDeQuantidades').hide();
		$('.quantidadeManual').fadeIn(150).css('display','flex');
		}else{
			$('.listaDeQuantidades').fadeIn(150).css('display','flex');
			$('.quantidadeManual').hide();
			}
	return;
	}
function perguntasDoProduto(){
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=perguntasDoProduto',dataType: 'html', 
			success: function(resposta){ 
				$('#perguntasDoProduto').html(resposta); 
			}
		});
	return;
	}
function perguntar(){
	pergunta = outputFilter($('#pergunta').val());
	if(pergunta.length==0){return;}
	loading('loading2');
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=perguntar&pergunta='+pergunta,dataType: 'html', 
			success: function(resposta){ 
				$('#perguntaFeita').fadeIn(150).css('display','flex');
				perguntasDoProduto();
				$('#pergunta').val('');
				setTimeout(function(){
					loading('loading2');
					setTimeout(function(){
						$('#perguntaFeita').fadeOut(150);
						},4000);
					},1000);
				
			}
		});
	return;
	}	
function comoPerguntar(){
	$('#pergunta').focus();
	return;
	}
function fecharPerguntaFeita(){
	$('#perguntaFeita').fadeOut(150);
	return;
	}
function adicionarAoCarrinho(destino){
	loading('loading2');
	if(checkoutExterno('Ao clicar em comprar na pÃ¡gina produto')==true){
		loading('loading2');
		return;
		}
	if($('#situaÃ§Ã£oCheckoutExterno').text()=='ativo' && $('#acionamentoCheckoutExterno').text()=='ApÃ³s inserir o endereÃ§o'){
		destino = 'endereÃ§o';
	}
	quantidade = document.querySelectorAll('.quantidadeEscolhida')[0]['innerText'];
	quantidadeTotal = $('#quantidadeTotal').text();
	variaÃ§Ãµes = '';
	totalDeVariaÃ§Ãµes = $('.totalDeVariaÃ§Ãµes').text();
	for(c=0;c<totalDeVariaÃ§Ãµes;c++){
		tituloDaVariaÃ§Ã£o = document.querySelectorAll('.tituloDaVariaÃ§Ã£o'+c)[0]['innerText'];
		atributoDaVariaÃ§Ã£o = document.querySelectorAll('.atributoDaVariaÃ§Ã£o'+c)[0]['innerText'];
		variaÃ§Ãµes = variaÃ§Ãµes+tituloDaVariaÃ§Ã£o+':::'+atributoDaVariaÃ§Ã£o+'||';
		}
	$.ajax({
		url: $('#caminhoBase').text()+'/api/',type: 'POST',async: true, data: 'metodo=adicionarProdutoNoCarrinho&quantidade='+quantidade+'&quantidadeTotal='+quantidadeTotal+'&variaÃ§Ãµes='+variaÃ§Ãµes+'&destino='+destino,dataType: 'html', 
		success: function(){
			window.location.href = $('#caminhoAtual').text()+'/'+destino;
			}
		});
	return;
	}


jQuery(document).ready(function($){

	$("#imagens-do-produto").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		items : 1});


	$('.quantidadePersonalizada').keyup(function(){
		q = $('.quantidadePersonalizada').val();
		qt = $('#quantidadeTotal').text();
		if(parseInt(q)>parseInt(qt)){
			$('.quantidadePersonalizada').val(qt);
			}
		});
	});