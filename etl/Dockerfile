FROM continuumio/miniconda3

RUN conda create -n transformers
ENV PATH /opt/conda/envs/transformers/bin:$PATH
SHELL ["conda", "run", "-n", "transformers", "/bin/bash", "-c"]

RUN conda install python pandas tqdm pytorch cpuonly -c pytorch
RUN conda install -c conda-forge jupyterlab ipywidgets nodejs
RUN pip install simpletransformers
RUN jupyter nbextension enable --py widgetsnbextension
RUN jupyter labextension install @jupyter-widgets/jupyterlab-manager

CMD [ "jupyter", "lab", "--allow-root", "--no-browser", "--ip", "0.0.0.0" ]
