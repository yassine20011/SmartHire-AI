import { SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm'
import { LucidModel } from '@adonisjs/lucid/types/model'

export default class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  /**
   * Convert a string from snake_case to camelCase
   */
  private toCamelCase(value: string): string {
    return value.replace(/_([a-z])/g, (_, group) => group.toUpperCase())
  }

  /**
   * Convert model property name to database column name
   */
  public columnName(_: LucidModel, attributeName: string): string {
    return this.toCamelCase(attributeName)
  }

  /**
   * Convert model name to database table name
   */
  // public tableName(model: LucidModel): string {
  //   return this.toCamelCase(model.name)
  // }

  /**
   * Convert foreign key column name
   */
  public foreignKeyName(model: LucidModel): string {
    return this.toCamelCase(`${model.name}Id`)
  }

  /**
   * Convert pivot table name
   */
  public pivotTableName(modelA: string, modelB: string): string {
    return this.toCamelCase(`${modelA}_${modelB}`)
  }

  /**
   * Convert serial column name (primary key)
   */
  public serializedName(_: LucidModel, attributeName: string): string {
    return this.toCamelCase(attributeName)
  }
}
