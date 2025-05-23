FROM n8nio/n8n:latest

USER root

# Copier les fichiers compilés du nœud personnalisé dans le conteneur
COPY ./dist /home/node/.n8n/custom

# Définir les permissions appropriées
RUN chown -R node:node /home/node/.n8n/custom

USER node
