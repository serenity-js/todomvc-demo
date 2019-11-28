Feature: Todo List App

  In order to help me get more _done_
  As a high performer
  I'd like to be able to **focus on my outstanding tasks**

  Scenario Outline: An actor can filters the list to show active items only

  Did you notice that with **Serenity/JS** you can use [Markdown](https://en.wikipedia.org/wiki/Markdown)
  to better describe each `Feature` and `Scenario`?

    Given Jasmine has a todo list containing: <items>
      And she has toggled the item called: Write some code
     When she filters her list to show only <filter> items
     Then her todo list should contain: <expected>

    Examples:
      | items                                     | filter    | expected                 |
      | Play guitar, Read a book, Write some code | Active    | Play guitar, Read a book |
      | Play guitar, Read a book, Write some code | Completed | Write some code          |
