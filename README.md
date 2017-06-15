## Sling, Slack Clone

### API Deploy

[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-7-deploy-to-heroku-6b3d1ce9bfd5](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-7-deploy-to-heroku-6b3d1ce9bfd5)

### Frontend Deploy

```
#build

REACT_APP_API_URL=production_host/api yarn run build
```

---

```
#deploy

surge -p build
```

👍Thanks:    
[https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-1-project-setup-3252ae780a1](https://medium.com/@benhansen/lets-build-a-slack-clone-with-elixir-phoenix-and-react-part-1-project-setup-3252ae780a1)
