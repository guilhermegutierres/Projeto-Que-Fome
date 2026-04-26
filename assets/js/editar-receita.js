document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form-receita"); 
    const params = new URLSearchParams(window.location.search);
    const idReceita = params.get("id");

    if (!idReceita) {
        alert("ID da receita não encontrado.");
        window.location.href = "minhas-receitas.html";
        return;
    }

    let imagemAtualBase64 = ""; 
    const inputImagem = document.getElementById("imagem");
    const previewArea = document.getElementById("preview"); 
    const passosContainer = document.getElementById("passos-container");

    /* ================= LÓGICA DO BOTÃO "+ ADICIONAR PASSO" ================= */
    document.getElementById("add-passo").addEventListener("click", () => {
        const div = document.createElement("div");
        div.classList.add("passo-item");
        div.innerHTML = `<input type="text" placeholder="Novo passo" class="passo-input" />`;
        passosContainer.appendChild(div);
    });

    /* ================= CARREGA DADOS DO BANCO ================= */
    try {
        const response = await fetch(`http://localhost:3000/api/receitas/${idReceita}`);
        if (!response.ok) throw new Error("Receita não encontrada.");
        
        const receita = await response.json();

        // Preenche campos simples
        document.getElementById("titulo").value = receita.titulo;
        document.getElementById("descricao").value = receita.descricao || "";
        
        if (receita.video) {
            document.getElementById("video").value = receita.video;
        }

        // Lógica de preenchimento dinâmico dos Passos
        if (receita.modo_preparo) {
            passosContainer.innerHTML = ""; // Limpa o passo 1 vazio padrão
            const passosArray = receita.modo_preparo.split('\n'); // Quebra o texto em linhas
            
            passosArray.forEach(passo => {
                if (passo.trim() !== "") {
                    const div = document.createElement("div");
                    div.classList.add("passo-item");
                    // Cria os inputs já preenchidos com os passos do banco
                    div.innerHTML = `<input type="text" value="${passo.trim()}" class="passo-input" />`;
                    passosContainer.appendChild(div);
                }
            });
        }

        // Mostra a imagem antiga no Preview
        if (receita.imagem) {
            imagemAtualBase64 = receita.imagem;
            if (previewArea) {
                previewArea.src = receita.imagem;
                previewArea.style.width = "100%";
                previewArea.style.height = "200px"; // Ajuste para ficar bonito
                previewArea.style.objectFit = "cover";
                previewArea.style.borderRadius = "8px";
            }
        }

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar as informações da receita.");
    }

    /* ================= PRÉ-VISUALIZAÇÃO (NOVA FOTO) ================= */
    if (inputImagem) {
        inputImagem.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evento) => {
                    if (previewArea) {
                        previewArea.src = evento.target.result;
                        previewArea.style.width = "100%";
                        previewArea.style.height = "200px";
                        previewArea.style.objectFit = "cover";
                        previewArea.style.borderRadius = "8px";
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    /* ================= LÓGICA DE SALVAR (UPDATE) ================= */
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Pega todos os passos dinâmicos e junta em um texto só (com quebra de linha)
            const passosInputs = document.querySelectorAll(".passo-input");
            let modoPreparoArray = [];
            passosInputs.forEach(input => {
                if(input.value.trim() !== "") {
                    modoPreparoArray.push(input.value.trim());
                }
            });
            const modoPreparoString = modoPreparoArray.join('\n');

            let linkVideo = document.getElementById("video").value;
            if (linkVideo && !linkVideo.includes("embed")) {
                const videoId = linkVideo.split("v=")[1]?.substring(0, 11);
                if (videoId) linkVideo = `https://www.youtube.com/embed/${videoId}`;
            }

            let imagemFinal = imagemAtualBase64;

            if (inputImagem.files && inputImagem.files[0]) {
                const file = inputImagem.files[0];
                const reader = new FileReader();
                
                reader.onloadend = async () => {
                    imagemFinal = reader.result;
                    await enviarAtualizacao(imagemFinal, linkVideo, modoPreparoString);
                };
                reader.readAsDataURL(file);
            } else {
                await enviarAtualizacao(imagemFinal, linkVideo, modoPreparoString);
            }
        });
    }

    /* ================= ENVIO PARA O BACKEND ================= */
    async function enviarAtualizacao(imagemFinal, linkVideo, preparoFinal) {
        const payload = {
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value,
            modo_preparo: preparoFinal, // Variável que juntou os passos
            imagem: imagemFinal,
            video: linkVideo
        };

        try {
            const response = await fetch(`http://localhost:3000/api/receitas/${idReceita}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Receita atualizada com sucesso!");
                window.location.href = "minhas-receitas.html";
            } else {
                alert("Erro ao atualizar receita.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("O servidor backend está ligado?");
        }
    }
});