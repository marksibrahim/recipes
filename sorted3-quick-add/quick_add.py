"""
For use with Alfred, combine with 
https://github.com/fnando/alfred-workflows/blob/master/Copy%20current%20URL.alfredworkflow
"""

import webbrowser
import click


OPEN_URL = "sorted://x-callback-url/open?item=today"
SAVE_URL = "sorted://x-callback-url/add?"


@click.group()
def cli():
    pass


@cli.command()
@click.argument("task", type=str)
def add_to_inbox(task):
    xcallback = SAVE_URL + f"title={task}"
    webbrowser.open(xcallback, new=0)


@cli.command()
@click.argument("title-url", type=str)
def add_to_reading_list(title_url):
    title, url = title_url.split("~")
    clean_title = remove_arxiv_num(title)
    xcallback = SAVE_URL + f"title={clean_title} {url}&list=Reading List"
    webbrowser.open(xcallback, new=0)


def remove_arxiv_num(url: str):
    if not url.startswith("["):
        return url
    return url.split("]")[1].strip()


if __name__ == "__main__":
    cli()

