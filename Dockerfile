FROM node:24-alpine

# ==================== CONFIGURAÇÃO BÁSICA ====================
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=America/Sao_Paulo \
    LANG=pt_BR.UTF-8

# Atualiza pacotes e instala ferramentas essenciais
RUN apk update && apk upgrade && \
    apk add --no-cache \
        vim \
        zsh \
        git \
        curl \
        sudo \
        starship \
        musl \
        musl-utils \
        musl-locales \
        tzdata

# Configura locale
# O Alpine Linux usa musl, que tem suporte limitado a locales. No entanto, podemos configurar o ambiente para usar UTF-8.
RUN echo 'export LANG=pt_BR.UTF-8' >> /etc/profile.d/locale.sh

# O LC_ALL é uma variável de ambiente que define a localidade para todas as categorias. Definir LC_ALL para pt_BR.UTF-8 garante que todas as operações relacionadas à localidade usem essa configuração.
RUN echo 'export LC_ALL=pt_BR.UTF-8' >> /etc/profile.d/locale.sh

# Configura o fuso horário
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

# O arquivo /etc/timezone é usado por algumas aplicações para determinar o fuso horário. Escrever "America/Sao_Paulo" nesse arquivo garante que essas aplicações reconheçam o fuso horário corretamente.
RUN echo "America/Sao_Paulo" > /etc/timezone

# # ==================== USUÁRIO node ====================
# RUN useradd -m -s /bin/zsh node && \
#     echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# USER node
WORKDIR /home/node

# ==================== INSTALAÇÃO DO STARSHIP ====================
# RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes

# ==================== CONFIGURAÇÃO DO ZSH + ZINIT ====================
RUN mkdir -p ~/.config

# Cria o .zshrc com sua configuração
RUN cat > ~/.zshrc << 'EOF'
# ====================== ZINIT ======================
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
if [ ! -d "$ZINIT_HOME" ]; then
    mkdir -p "$(dirname "$ZINIT_HOME")"
    git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi
source "${ZINIT_HOME}/zinit.zsh"

# Plugins (light = mais rápido)
zinit light zdharma-continuum/fast-syntax-highlighting
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-history-substring-search
zinit light hlissner/zsh-autopair
zinit load zdharma-continuum/history-search-multi-word

# History substring search (setas ↑ ↓)
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down

# ====================== STARSHIP ======================
eval "$(starship init zsh)"

# Opcional: alias úteis
alias ll='ls -lah --color=auto'
alias gs='git status'
alias gc='git commit'
EOF

# ==================== STARSHIP CONFIG ====================
RUN mkdir -p ~/.config && cat > ~/.config/starship.toml << 'EOF'
[directory]
home_symbol = ""
truncation_length = 8
truncation_symbol = "…/"

[git_branch]
symbol = " "

[git_status]
format = "[$all_status$ahead_behind]($style) "
EOF

# Aplica o preset gruvbox-rainbow ao Starship
RUN starship preset gruvbox-rainbow -o ~/.config/starship.toml && \
    sed -i \
    -e 's//❯/g' \
    -e 's//❮/g' \
    ~/.config/starship.toml
  
# ==================== MENSAGEM DE BOAS-VINDAS ====================
RUN cat > /usr/local/bin/welcome.sh << 'WELCOME'
#!/bin/zsh
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🚀  Container Node.js + Zsh + Starship configurado!        ║"
echo "║                                                              ║"
echo "║  ✅  Ambiente pronto para desenvolvimento                   ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Diretório atual: $(pwd)"
echo "🐋 Node.js: $(node -v)"
echo "📦 npm: $(npm -v)"
echo ""
echo "Dica: Use 'll', 'gs', etc."
echo ""
WELCOME

RUN chmod +x /usr/local/bin/welcome.sh

# Define ZSH como shell padrão
SHELL ["/bin/zsh", "-c"]
  
# Inicia direto no Zsh
CMD ["zsh", "-c", "/usr/local/bin/welcome.sh && exec zsh"]