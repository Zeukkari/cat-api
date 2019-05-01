# Specify the image that this app is going to be built from.  This is a docker hub hosted Node image
	FROM node:10

	EXPOSE 3000 9229

	# Change directory to the specified subdirectory
	WORKDIR /home/app

	COPY package.json /home/app/
	COPY package-lock.json /home/app/

	RUN npm ci

	COPY . /home/app

	RUN npm run build

	CMD npm run dev
