FROM nginx:alpine

RUN mkdir /usr/share/nginx/html/hangman-mqtt

COPY ./build /usr/share/nginx/html/hangman-mqtt

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]